import React, { useContext, useState } from 'react'
import { MyContext } from '../../context/BackendContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

    const { updateLoginStatus, setUser, fetchUser } = useContext(MyContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [roles, setRoles] = useState("USER")
    

    const navigate = useNavigate();

    const setWarning = (msg) => {
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
            return;
        }
        else if(email.length<=6 ||  password.length<=6){
            toast.error("Username and password should be atleast 6 characters long.")
            return;
        }
        else if (name === "" || email === "" || password === "" || confirmPassword === "") {
            setWarning("Please enter all the fields.")
            return
        }
        else {
            const user = { name, email, password, roles};
            axios.post("http://localhost:8084/auth/new", user)
                .then(res => {
                    toast.success("Signed up successfully")
                    navigate("/login")
                })
                .catch(err => {
                    toast.error(err.message)
                });
                
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">User SignUp</h3>
                            <form onSubmit={validateAndSubmit}>
                            <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup