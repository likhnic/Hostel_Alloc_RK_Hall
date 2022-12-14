import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {

    let navigate = useNavigate()
    const [details, setDetails] = useState({ rollno: "", name: "", password: "", contact: "", email: "" })

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`https://rk-hall-alloc-api.onrender.com/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ rollno: details.rollno, name: details.name, email: details.email, contact: details.contact, password: details.password })
        })

        const json = await response.json()
        if (json.error) {
            navigate('/register')
            props.Error(json.error)
        }
        else {
            navigate('/')
        }
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form className='mt-5'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" required name='name' className="form-control" onChange={onChange} id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" required name='email' className="form-control" onChange={onChange} id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="rollno" className="form-label">Roll No</label>
                    <input type="text" required name='rollno' className="form-control" onChange={onChange} id="rollno" />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input type="text" required name='contact' className="form-control" onChange={onChange} id="contact" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required className="form-control" onChange={onChange} id="password" name='password' />
                </div>

                <button type="submit" required className="btn btn-primary" onClick={handleOnSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default Register