import React from 'react'

const Roomdetails = (props) => {
    const { details } = props
    
    return (
        <div>
            {details.name && (<div className="card m-2">
                <div className="card-body">
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
            </div>)}
            {!details.name && (<div className='card'><div className="card-body">Room is free</div></div>)}
        </div>
    )
}

export default Roomdetails