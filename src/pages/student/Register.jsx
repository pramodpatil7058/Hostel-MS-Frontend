import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../context/BackendContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../context/axiosInstance';


const Register = () => {
    const {token} = useContext(MyContext);
    const {user,userDetails, setUserDetails,setUserNotFound, auth} = useContext(MyContext);
    const [studentId, setStudentId] = useState(user.id);
    const [studentName, setStudentName] = useState(userDetails.studentName||"");
    const [about, setAbout] = useState(userDetails.about||"")
    const [email,setEmail] = useState(user.email)
    const [address, setAddress] = useState(userDetails.address||"")
    const [status, setStatus] = useState(false)
    const [branch, setBranch] = useState(userDetails.branch||"")
    const [yos, setYos] = useState(userDetails.yos||"")

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault()
        const data = {studentId, studentName, email:user.email,about,branch, status, address,yos}
        axiosInstance.post("/student/saveStudent", data )
        .then(res=>{
            setUserDetails(res.data);
            setUserNotFound(false)
            toast.success("Data saved successfully.")
            navigate("/userhome")
        })
        .catch(err=>{
            toast.error("Cannot Register this user.")
        })
    }



    return (
        <div className="container background-blue">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Hostel Application</h3>
                            <form className='d-flex flex-column align-items-center' onSubmit={register}>
                                <div className="w-100 mb-2">
                                    <label className="form-label">Student Id:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={studentId}
                                        required
                                        disabled
                                    />
                                </div>
                                <div className="w-100 mb-3">
                                    <label className="form-label">Student Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-100 mb-3">
                                    <label className="form-label">Student Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        required
                                        disabled
                                    />
                                </div>
                                <div className="w-100 mb-3">
                                    <label className="form-label">Student Address:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-100 mb-3">
                                    <label className="form-label">Branch:</label>
                                    <select className='form-select' name="branch" id="branch" onChange={(e)=>{setBranch(e.target.value);}}>
                                        <option value="">Select Your Course</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ELE">ELE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="MECH">MECH</option>
                                        <option value="CIVIL">CIVIL</option>
                                    </select>
                                </div>
                                <div className="w-100 mb-3">
                                    <label className="form-label">Year of Study:</label>
                                    <select className='form-select' name="yos" id="yos" onChange={(e)=>{setYos(e.target.value);}}>
                                        <option value="">Select Year of Study</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </select>
                                </div>
                                <div className="w-100 mb-3">
                                    <label className="form-label">About You:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        required
                                        placeholder='Tell us something about you...'
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-50 mt-3">
                                    Register
                                    <i className="fa-solid fa-arrow-right-to-bracket ps-2"></i>
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register