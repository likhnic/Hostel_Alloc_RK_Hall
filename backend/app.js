if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const fetchuser = require('./fetchuser');
const Student = require('./models/Student');
const Room = require('./models/Rooms');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const mongoURI = "mongodb://localhost:27017/hostelallocV2";
const dbURL = process.env.DB_URL || mongoURI

mongoose.set("strictQuery", false)

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/', (req, res) => {
    res.send({ success: "Webiste is Live!!!" })
})


app.post('/register', async (req, res) => {
    try {
        const token = req.header('auth-token')
        const { rollno, name, email, contact, password } = req.body
        if (token !== 'Admin') {
            return res.status(500).send({ error: "Unauthorised User" })
        }
        if (!rollno || !name || !email || !contact || !password) {
            return res.json({ error: "Some feilds are empty!!" })
        }
        let student = await Student.findOne({ rollno: req.body.rollno });

        if (student) {
            return res.status(400).json({ error: "Sorry student with the email already exists" })
        }

        const salt = await bcrypt.genSalt(5)
        let newpassword = await bcrypt.hash(password, salt)

        student = await Student.create({
            rollno: rollno,
            name: name,
            email: email,
            contact: contact,
            password: newpassword
        })

        return res.json({ success: "Success" })
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error!" })
    }
})


app.post('/login', async (req, res) => {
    const { rollno, password } = req.body
    if (!rollno || rollno.length === 0 || !password || password.length === 0) {
        return res.json({ error: "Invalid Login Data" })
    }

    if (rollno === "Admin" && password === "Admin") {
        return res.json({ user: "Admin" })
    }

    try {
        let student = await Student.findOne({ rollno })
        if (!student) {
            return res.status(400).json({ error: "Email or Password are incorrect" })
        }
        const comPass = await bcrypt.compare(password, student.password)

        if (!comPass) {
            return res.status(400).json({ error: "Email or Password are incorrect" })
        }

        const token = jwt.sign({ user: { id: student.id } }, "secrethaha")
        res.json({ user: token })
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})


app.post('/searchuser', fetchuser, async (req, res) => {
    const { rollno, name } = req.body
    if (rollno && rollno.length) {
        let student = await Student.find({ rollno }, { password: 0 })
        if (student.length === 0) return res.json({ error: "Sorry, Not found" })
        return res.json(student)
    }
    else if (name && name.length >= 3) {
        let student = await Student.find({ name: { $regex: `.*${name}.*`, '$options': 'i' } }, { password: 0 })
        if (student.length === 0) return res.json({ error: "Sorry, Not found" })
        return res.json(student)
    }
    else res.json({ error: "Please enter either Name(length>=3) or Roll No" })
})


app.get('/fetchDetails/:roomid', fetchuser, async (req, res) => {
    const { roomid } = req.params
    const student = await Student.find({ roomid }, { password: 0 })
    return res.json(student)
})


app.get('/userdetails', fetchuser, async (req, res) => {

    if (req.user === 'Admin') {
        return res.json({
            student: {
                rollno: "Admin",
                name: "Admin",
                email: "Admin@Admin.com",
                contact: "Admin",
                block: "Admin",
                room: "Admin",
                roomid: "Admin",
            }
        })
    }
    const student = await Student.findById(req.user.id)
    if (!student) {
        return res.status(500).json({ error: "Internal Error" })
    }
    res.json({ student })
})


app.get('/roomlist', fetchuser, async (req, res) => {

    let currRooms = await Room.find({}).sort({ "roomid": 1, "_id": 1 })
    return res.json({ currRooms })
})


app.get('/avail', fetchuser, async (req, res) => {

    if (req.user !== 'Admin') {
        return res.status(500).json({ error: "Unauthorised User" })
    }

    let allrooms = await Room.find({})
    let userAvail = []
    const allStudents = await Student.find({}, { password: 0 })
    allStudents.map((u) => {
        let curruser = { rollno: u.rollno, taken: ((u.roomid || u.roomid === 0) ? 1 : 0) }
        userAvail.push(curruser)
    })
    let roomsAvail = allrooms.filter((room) => room.available !== 0)
    res.json({ roomsAvail, userAvail })
})


app.post('/newdetails', fetchuser, async (req, res) => {

    const { roomid, rollno } = req.body
    if (req.user !== 'Admin') {
        return res.status(500).json({ error: "Unauthorised User" })
    }
    let studentNewDetails = {}
    studentNewDetails.roomid = roomid
    studentNewDetails.rollno = rollno
    let currdetails = await Student.findOne({ rollno }, { password: 0 })
    let prevRoom
    if (currdetails.roomid === roomid) {
        return res.json({ currdetails })
    }
    else {
        prevRoom = currdetails.roomid
    }
    if (!currdetails) {
        return res.status(404).json({ error: "Page not found" })
    }
    let currRoom = await Room.findOne({ roomid })
    if (!currRoom) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
    if (currRoom.available === 0) {
        return res.status(500).json({ error: "Room is not available" });
    }
    currdetails = await Student.findOneAndUpdate({ rollno }, { $set: studentNewDetails }, { new: true })
    currRoom.available -= 1
    // updating availability of new room
    await Room.findOneAndUpdate({ roomid }, { $set: { available: currRoom.available } }, { new: true })
    // if student was in prev room, then remove him from that room, i.e., increase its availability
    if (prevRoom) {
        let prevFilled = await Room.findOne({ roomid: prevRoom })
        prevFilled.available += 1;
        await Room.updateOne({ roomid: prevRoom }, { $set: { available: prevFilled.available } }, { new: true })
    }
    res.json({ currdetails })
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening to port`);
})