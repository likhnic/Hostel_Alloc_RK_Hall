import React from 'react'

const Errors = (props) => {
    return (
        <div className='mt-3' style={{ height: '50px' }}>
            {props.error && <div className='container'>
                <div className={`alert alert-danger alert-dismissible fade show`} role="alert">
                    <strong>{props.error.message}</strong>
                </div>
            </div>}
        </div>
    )
}

export default Errors