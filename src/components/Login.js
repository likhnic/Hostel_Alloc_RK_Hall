import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ rollno: "", password: "" })

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://rk-hall-alloc-api.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rollno: credentials.rollno, password: credentials.password })
        })
        const json = await response.json()
        if (!json.error) {
            localStorage.setItem('token', json.user)
            navigate('/')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/')
        }
    },[])

    return (
        <div className='my-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="rollno" className="form-label">Roll Number</label>
                    <input type="text" className="form-control" value={credentials.rollno} onChange={onChange} id="rollno" name="rollno" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login