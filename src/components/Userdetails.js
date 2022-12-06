import React, { useEffect, useState } from 'react'

const Userdetails = () => {

    const [details, setDetails] = useState({ rollno: "", name: "", email: "", contact: "", block: "", room: "", roomid: "", password: "" })
    const fetchUserDetails = async () => {
        const authToken = localStorage.getItem('token');
        const response = await fetch('https://rk-hall-alloc-api.onrender.com/userdetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
        const json = await response.json()
        if (json.error) {
            return
        }
        await setDetails({ rollno: json.student.rollno, name: json.student.name, email: json.student.email, contact: json.student.contact, block: json.student.block, room: json.student.room, roomid: json.student.roomid, password: json.student.password })
    }


    useEffect(() => {
        fetchUserDetails()
    }, [localStorage.getItem('token')])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    Name:
                </div>
                <div className="col-md-6">
                    {details.name}
                </div>
                <div className="col-md-6">
                    Roll Number:
                </div>
                <div className="col-md-6">
                    {details.rollno}
                </div>
                <div className="col-md-6">
                    Email:
                </div>
                <div className="col-md-6">
                    {details.email}
                </div>
                <div className="col-md-6">
                    Contact:
                </div>
                <div className="col-md-6">
                    {details.contact}
                </div>
                <div className="col-md-6">
                    Room:
                </div>
                <div className="col-md-6">
                    {(details.roomid || details.roomid === 0) ? details.roomid : "Room is not yet assigned"}
                </div>
            </div>
        </div>
    )
}

export default Userdetails