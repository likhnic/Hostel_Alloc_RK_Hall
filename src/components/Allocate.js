import React, { useEffect, useState } from 'react'
import Roomdetails from './Roomdetails'

const Allocate = () => {

    const [rooms, setRooms] = useState([])
    const [students, setStudents] = useState([])
    const [newdetails, setNewdetails] = useState({ rollno: "", roomid: "" })

    const fetchAvailability = async () => {
        const response = await fetch(`http://localhost:5000/avail`, {
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
        const response = await fetch(`http://localhost:5000/newdetails`, {
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
        setNewdetails({ ...newdetails, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchAvailability()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-body">
                        <form >
                        <div className="col-lg-6 mt-3">
                            <select className="form-select" name="roomid" aria-label="Default select example" onChange={onClick}>
                                <option defaultValue={"Select Room"}>Select Room</option>
                                {rooms.map((room) => {
                                    return (
                                        <option key={room.roomid} value={room.roomid}>{room.roomid}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 mt-3">
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
                        <button type="submit" className="btn btn-primary mt-3" onClick={handleOnClick}>Change Room</button>
                    </form>
                        </div>
                    </div>
                </div>
                {(newdetails.rollno || newdetails.rollno === 0) && newdetails.roomid && (
                    <div className="mt-3">
                        <Roomdetails details={newdetails} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Allocate