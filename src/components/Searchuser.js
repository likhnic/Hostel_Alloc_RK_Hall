import React from 'react'
import { useState } from 'react'
import Roomdetails from './Roomdetails'

const Searchuser = (props) => {


    const [data, setData] = useState({name:"", rollno:""})
    const [result, setResult] = useState([])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setResult([])
        const response = await fetch('http://localhost:5000/searchuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ rollno: data.rollno, name: data.name })
        })

        const json = await response.json()

        if(json.error){
            props.Error(json.error)
        }
        else{
            setResult(json)
        }
    }

    const onChange =(e)=>{
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <h5 className='fw-bold'>Enter either Roll No or Name to search</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="rollno" className="form-label">Roll No</label>
                            <input type="text" className="form-control" onChange={onChange} id="rollno" name='rollno'/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={onChange} id="name" name='name'/>
                        </div>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
            </div>

            {result.length!==0 && result.map((details)=>{
                return(
                    <Roomdetails key={details.rollno} details={details}/>
                )
            })}
        </div>
    )
}

export default Searchuser