import React, { useEffect, useState } from 'react'

const Userdetails = (props) => {

    const [details, setDetails] = useState({ rollno: "", name: "", email: "", contact: "", block: "", room: "", roomid: "", password: "" })
    const [loading, setLoading] = useState(false)

    const fetchUserDetails = async () => {
        setLoading(false)
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
            props.Error(json.error)
            return
        }
        await setDetails({ rollno: json.student.rollno, name: json.student.name, email: json.student.email, contact: json.student.contact, block: json.student.block, room: json.student.room, roomid: json.student.roomid, password: json.student.password })
        setLoading(true)
    }


    useEffect(() => {
        fetchUserDetails()
    }, [localStorage.getItem('token')])

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    {loading && (<div className="row">
                        <div className="col-4 col-lg-5">
                            Name:
                        </div>
                        <div className="col-8 col-lg-5">
                            {details.name}
                        </div>
                        <div className="col-4 col-lg-5">
                            Roll No.:
                        </div>
                        <div className="col-8 col-lg-5">
                            {details.rollno}
                        </div>
                        <div className="col-4 col-lg-5">
                            Email:
                        </div>
                        <div className="col-8 col-lg-5">
                            {details.email}
                        </div>
                        <div className="col-4 col-lg-5">
                            Contact:
                        </div>
                        <div className="col-8 col-lg-5">
                            {details.contact}
                        </div>
                        <div className="col-4 col-lg-5">
                            Room:
                        </div>
                        <div className="col-8 col-lg-5">
                            {(details.roomid || details.roomid === 0) ? details.roomid : "Room is not yet assigned"}
                        </div>
                    </div>)}
                    {!loading && (<div>Loading...</div>)}
                </div>
            </div>
        </div>
    )
}

export default Userdetails