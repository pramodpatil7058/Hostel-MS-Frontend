import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../context/BackendContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../../context/axiosInstance';
import { toast } from 'react-toastify';
import StudentPayments from '../../student/Payment/StudentPayments';
import StudentLeaves from '../../student/Leave/StudentLeaves';
import StudentHome from '../../student/StudentHome';

const StudentDetails = () => {
    const { studentId } = useParams();
    const { user, userDetails, setUserDetails } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [showLeaves, setShowLeaves] = useState(false);
    const navigate = useNavigate();
    const updateStatus = (status) => {
        setIsLoading(true);
        axiosInstance.get(`/warden/changeApplicationStatus`,
            {
                params: {
                    studentId: studentId,
                    status: status
                }
            })
            .then(res => {
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        if (userDetails === null) {
            setIsLoading(true);
        }
        axiosInstance.get(`/student/getStudent/${studentId}`)
            .then(res => {
                setUserDetails(res.data);
                setIsLoading(false);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error("Error: Failed to fetch student details")
            })
    }, [])
    return (
        <>
            {
                isLoading ? (
                    <h2>Loading....</h2>
                ) : (
                    <div className='card pb-3'>
                        <div className="card-body">
                            <div className="card-header">
                                <h3 className="card-title">Hello, {userDetails.studentName ? userDetails.studentName : user.name}</h3>
                            </div>
                            <h5 className="card-title mb-3">{userDetails.about}</h5>
                            <h6 className="card-subtitle mb-3"> <strong>Email : </strong> {userDetails.email}</h6>
                            <p className="card-text mb-3"> <strong>Branch : </strong> {userDetails.branch ? userDetails.branch : "NA"}</p>
                            <p className="card-text mb-3"> <strong>Address : </strong> {userDetails.address ? userDetails.address : "NA"}</p>
                            <p className="card-text mb-3"> <strong>Year : </strong> {userDetails.yos ? userDetails.yos : "NA"}</p>
                        </div>
                        <div className=' d-flex justify-content-evenly'>
                            {
                                !userDetails.status ? (
                                    <>
                                        <button className='btn btn-success' onClick={() => { updateStatus(true) }}> ACCEPT </button>
                                        <button className='btn btn-danger' onClick={() => { updateStatus(false) }}> REJECT </button>
                                    </>
                                ) : (
                                    <>
                                        <button className='btn btn-primary' onClick={() => { setShowLeaves(false); setShowPayments(true) }}> Student Payments</button>
                                        <button className='btn btn-primary' onClick={() => { setShowLeaves(true); setShowPayments(false) }}> Student Leaves</button>
                                    </>
                                )
                            }

                        </div >
                    </div>
                )
            }
            {
                showPayments && <StudentPayments studentId={studentId} />
            }
            {
                showLeaves && <StudentLeaves studentId={studentId} />
            }
        </>

    )
}

export default StudentDetails

