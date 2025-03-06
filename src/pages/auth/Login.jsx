import React, { useContext, useState } from 'react'
import { MyContext } from '../../context/BackendContext'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const { updateLoginStatus, setUser } = useContext(MyContext);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setMsg("Please enter all the fields.")
        }
        if(username.length<6 || password.length<6){
            toast.error("Username and password should be atleast 6 characters long.")
        }
        else {
            setIsLoading(true);
            const user = { username, password };
            axios.post("http://localhost:8084/auth/authenticate", user)
                .then(res => {
                    const user = res.data.user;
                    setUser(res.data.user);
                    if(res.data.user.roles==="USER"){
                        localStorage.setItem("studentId", res.data.user.id)
                    }
                    localStorage.setItem("token", res.data.jwttoken)
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    updateLoginStatus(true)
                    toast.success("Logged in successfully!",{className:"toast-success"})
                    setIsLoading(false)
                    localStorage.setItem("isLoggedIn", true);
                    navigate("/")
                })
                .catch(err => {
                    
                    setIsLoading(false)
                    if (err.status === 404) {
                        toast.error("Invalid Credentials.")
                    }
                    else if (err.status === 503) {
                        toast.error("SERVICE UNAVAILABLE.");
                    } else if (err.status === 500) {
                        toast.error("SOMETHING WENT WRONG");
                    } else if (err.status === 403) {
                        toast.error("Authentication Failed");
                    }else{
                        toast.error("SOMETHING WENT WRONG");
                    }
                    setPassword("")
                });
        }
    }


    return (
        <div className="container mt-5 background-blue">
            <div className="row justify-content-center">
                {
                    isLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <div className="col-md-6">
                            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                                <div className="card-body">
                                    <h3 className="card-title text-center mb-4">User Login</h3>
                                    <form className='d-flex flex-column align-items-center' onSubmit={handleLogin}>
                                        <div className="w-100 mb-3">
                                            <label className="form-label">username:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="w-100 mb-3">
                                            <label className="form-label">Password:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-50 mt-3">
                                            Login
                                            <i className="fa-solid fa-arrow-right-to-bracket ps-2"></i>
                                            </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Login