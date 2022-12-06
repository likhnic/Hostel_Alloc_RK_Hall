import React, { useEffect, useState } from 'react'
import Roomdetails from './Roomdetails'

const Allocate = () => {

    const [rooms, setRooms] = useState([])
    const [students, setStudents] = useState([])
    const [newdetails, setNewdetails] = useState({ rollno: "", roomid: "" })

    const fetchAvailability = async () => {
        const response = await fetch(`https://rk-hall-alloc-api.onrender.com/avail`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        })

        const json = await response.json()
        await setRooms(json.roomsAvail)
        await setStudents(json.userAvail)
    }


    const handleOnClick = async (e) => {
        e.preventDefault()
        const response = await fetch(`https://rk-hall-alloc-api.onrender.com/newdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ rollno: newdetails.rollno, roomid: newdetails.roomid })
        })

        const json = await response.json()
        setNewdetails(json.currdetails)
        fetchAvailability()
    }

    const onClick = (e) => {
        console.log(e.target.name)
        setNewdetails({ ...newdetails, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchAvailability()
    }, [])

    return (
        <>
            <div className="container m-3">
                <div className="row">
                    <form >
                        <div className="col-md-6 m-3">
                            <select className="form-select" name="roomid" aria-label="Default select example" onChange={onClick}>
                                <option defaultValue={"Select Room"}>Select Room</option>
                                {rooms.map((room) => {
                                    return (
                                        <option key={room} value={room}>{room}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-6 m-3">
                            <select className="form-select" name="rollno" aria-label="Default select example" onChange={onClick}>
                                <option defaultValue={"Select Room"}>Select Roll No</option>
                                {students.map((student, i) => {
                                    if(student.taken){
                                        return (
                                            <option key={i} value={student.rollno} className='special'>{student.rollno}</option>
                                        )
                                    }
                                    else{
                                        return (
                                            <option key={i} value={student.rollno} >{student.rollno}</option>
                                        )
                                    }
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary m-3" onClick={handleOnClick}>Add Note</button>
                    </form>
                </div>
                {(newdetails.rollno || newdetails.rollno === 0) && newdetails.roomid && (
                    <div className="m-3">
                        <Roomdetails details={newdetails} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Allocate