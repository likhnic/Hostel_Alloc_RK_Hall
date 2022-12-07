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


function App() {
    
    return (
        <>
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/userdetails" element={<Userdetails/>} />
                    <Route exact path="/allocate" element={<Allocate/>} />
                    <Route exact path="/register" element={<Register/>}/>
                </Routes>
            </div>
        </Router>
        </>
    );
}

export default App;
