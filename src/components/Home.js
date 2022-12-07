import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Roomdetails from './Roomdetails'

const Home = (props) => {

    let navigate = useNavigate()
    const [rooms,] = useState([...Array(500).keys()])
    const [details, setDetails] = useState({ rollno: "", name: "", email: "", contact: "", block: "", room: "", roomid: "", password: "" })
    const [loading, setLoading] = useState(false)
    const redirectLogin = () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
            return
        }
    }


    const handleOnClick = async (e) => {
        const room = Number(e.target.attributes.name.value)
        setLoading(false)
        const response = await fetch(`https://rk-hall-alloc-api.onrender.com/fetchDetails/${room}`, {
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
            <div className="row">
                {
                    rooms.map((room) => {
                        return (
                            <div key={room} className="col-md-1 mt-3">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" name={room} onClick={handleOnClick}>
                                    Room {room}
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Room Details</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {loading && (<Roomdetails details={details} />)}
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
            </div>
        </div>
    )
}

export default Home