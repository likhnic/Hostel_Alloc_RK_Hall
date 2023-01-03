import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    let location = useLocation();
    let navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={(localStorage.getItem('token')?"/":"/login")}>RK Hall</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {localStorage.getItem('token') && (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>)}
                            {localStorage.getItem('token') && (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/searchuser' ? "active" : ""}`} aria-current="page" to="/searchuser">Search</Link>
                            </li>)}
                            {localStorage.getItem('token') === 'Admin' && (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/allocate' ? "active" : ""}`} aria-current="page" to="/allocate">Allocate Room</Link>
                            </li>)}
                        </ul>
                        {!localStorage.getItem('token') &&
                            (<form action="" className="d-flex">
                                <Link to="/login" className="btn btn-primary me-2" role={"button"}>Login</Link>
                            </form>)
                        }
                        {localStorage.getItem('token') === 'Admin' && (
                            <div><Link to="/register" className="btn btn-primary me-1" role={"button"}>Register</Link></div>
                        )}
                        {localStorage.getItem('token') &&
                            (<>
                                <Link className="btn btn-primary my-1 me-1" role={"button"} to={"/userdetails"}><i className="fa-solid fa-user"></i></Link>
                                <form action="" className="d-flex">
                                    <button className="btn btn-primary me-2" onClick={handleLogout}>Logout</button>
                                </form>
                            </>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar