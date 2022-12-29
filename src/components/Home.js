import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Roomdetails from './Roomdetails'
import {data} from './roomData'

const Home = (props) => {

    let navigate = useNavigate()
    const [rooms,setRooms] = useState(data)
    const [mainload, setMainload] = useState(false)
    let prev = 'Z'
    const [details, setDetails] = useState({ rollno: "", name: "", email: "", contact: "", block: "", room: "", roomid: "", password: "" })
    const [loading, setLoading] = useState(false)
    const redirectLogin = () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
            return
        }
        else{
            fetchRooms()
        }
    }

    const fetchRooms = async() =>{
        setMainload(false)
        const response = await fetch(`http://localhost:5000/roomlist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        })

        const json=await response.json()
        setRooms(json.currRooms)
        setMainload(true)
    }


    const handleOnClick = async (e) => {
        const room = (e.target.attributes.name.value)
        setLoading(false)
        const response = await fetch(`http://localhost:5000/fetchDetails/${room}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        })

        const json = await response.json()
        if (json.error) {
            navigate('/login')
            props.Error(json.error)
            return
        }
        setDetails(json)
        setLoading(true)
    }

    useEffect(() => {
        
        redirectLogin()
    }, [])

    return (
        <div className="container">
            {mainload && (<div className="row">
                {
                    rooms.map((room) => {
  
                        return (
                            <div key={room.roomid} className="col-md-1 mt-3">
                                <button type="button" className={`btn btn-${room.available?"success":"danger"}`} data-bs-toggle="modal" data-bs-target="#exampleModal" name={room.roomid} onClick={handleOnClick}>
                                    Room {room.roomid}
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Room Details</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {loading && (details.map((detail)=>{
                                                    return (
                                                        <Roomdetails key={detail.rollno} details={detail} />
                                                    )
                                                }))}
                                                {loading && (details.length===0 && (<div>Room is Free</div>))}
                                                {!loading && (<div>Loading...</div>)}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>)}
            {!mainload && (<div className='row'>Loading...</div>)}
        </div>
    )
}

export default Home