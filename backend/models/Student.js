const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const StudentSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required :true
    },
    rollno:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    block:{
        type:String
    },
    room:{
        type:String
    },
    roomid:{
        type:String
    }
})

const Student=mongoose.model('student',StudentSchema)
module.exports=Student