import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Userdetails from "./components/Userdetails";
import Allocate from "./components/Allocate";
import Register from "./components/Register";
import { useState } from "react";
import Errors from "./components/Errors";
import Searchuser from "./components/Searchuser";


function App() {


    const [error, setError] = useState(null)
    const Error = (message)=>{
        setError({message})
        console.log("error", message);
        setTimeout(()=>{
            setError(null)
        },3000)
    }

    return (
        <>
        <Router>
            <Navbar />
            <Errors error={error} />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home Error={Error}/>} />
                    <Route exact path="/login" element={<Login Error={Error}/>} />
                    <Route exact path="/userdetails" element={<Userdetails Error={Error}/>} />
                    <Route exact path="/allocate" element={<Allocate Error={Error}/>} />
                    <Route exact path="/register" element={<Register Error={Error}/>}/>
                    <Route exact path="/searchuser" element={<Searchuser Error={Error}/>}/>
                </Routes>
            </div>
        </Router>
        </>
    );
}

export default App;
