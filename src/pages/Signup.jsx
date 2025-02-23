import React, { useContext, useState } from 'react'
import { MyContext } from '../context/BackendContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const { updateLoginStatus,setUser } = useContext(MyContext)

    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("ROLE_STUDENT");
    const [response, setResponse] = useState({});

    const navigate = useNavigate();

    const setWarning = (msg) => {
        console.log("setWarning called")
        const para = document.getElementById("warning")
        if (para) {
            para.style.color = 'red';
            para.innerText = msg
        }
    }

    const validateAndSubmit = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setWarning("Password mismatch, Please Try again");
            setPassword("");
            setConfirmPassword("")
        }
        else if (studentName === "" || email === "" || password === "" || confirmPassword === "" || about === "") {
            setWarning("Please enter all the fields.")
        }
        else {
            const user = { studentName, email, about, password, role };
            axios.post("http://localhost:8085/student/saveStudent", user, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                console.log("Student Id",res.data.studentId);
                setUser(res.data);
                updateLoginStatus(true)
                window.localStorage.setItem("studentId",res.data.studentId);
                navigate("/")
            })
            .catch(err => console.log(err));
            
        }
    }
    return (
        <div className="container">
            <form onSubmit={validateAndSubmit}>
                <h3>Student Registration</h3>
                <p id="warning"></p>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Student Name</label>
                    <input type="text" onChange={(e) => setStudentName(e.target.value)} value={studentName} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="about" className="form-label">About</label>
                    <input type="text" onChange={(e) => setAbout(e.target.value)} value={about} className="form-control" id="about" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="form-control" id="password2" />
                </div>
                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="isWarden">warden?</label>
                    <input type="checkbox" className="form-check-input" id="isWarden" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup