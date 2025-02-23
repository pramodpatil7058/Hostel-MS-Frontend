import React, { useContext, useState } from 'react'
import { MyContext } from '../context/BackendContext'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();

    const { updateLoginStatus, setUser } = useContext(MyContext);

    const validateAndSubmit = (e) => {
        e.preventDefault();
         if (email === "" || password === "" ) {
            setMsg("Please enter all the fields.")
        }
        else {
            const user = { email, password };
            axios.post("http://localhost:8085/student/login", user, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                console.log(res.data);
                setUser(res.data);
                console.log("Student Id",res.data.studentId);
                window.localStorage.setItem("studentId",res.data.studentId);
                updateLoginStatus(true)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                if(err.status === 404){
                    // setWarning("Invalid Credentials")
                    setMsg("Invalid Credentialspi\n")
                }
                else if(err.status === 503){
                    alert("SERVICE UNAVAILABLE");
                }else if(err.status === 500){
                    alert("SOMETHING WENT WRONG");
                }
            });
        }
    }

    return (
        <div className="container">
            {msg && <Alert msg = {msg}/>}
            <form onSubmit={validateAndSubmit}>
                <h3>Login</h3>
            <p id="warning"></p>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={(e)=>{
                        setEmail(e.target.value)
                        setMsg("")
                    }} value={email} id="username" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e)=>{
                        setPassword(e.target.value)
                        setMsg("")
                    }} value={password} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login