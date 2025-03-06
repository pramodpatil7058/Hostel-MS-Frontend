import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../context/axiosInstance'
import { toast } from 'react-toastify'

const AddPayment = () => {

    const navigate = useNavigate();
    const { studentId } = useParams()
    const [isSuccess, setIsSuccess] = useState(false)
    const [payment, setPayment] = useState({
        studentId: studentId?studentId:localStorage.getItem("studentId"),
        reason: "",
        amount: 0,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addPayment = (e) => {
        e.preventDefault();
        axiosInstance.post("/warden/addPayment",payment)
        .then(res=>{
            toast.success("Payment added successfully.")
            setIsSuccess(true);
        })
        .catch(err=>{
            toast.error("Payment not added.")
        })
    }
    return (
        <div className="container background-blue">
            {
                isSuccess ? (
                    <button className='btn btn-primary' onClick={() => navigate(`/student/${studentId}/view`)}>Back to Payments</button>
                ) : (
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                                <div className="card-body">
                                    <h3 className="card-title text-center mb-4">Payment</h3>
                                    <form onSubmit={addPayment}>
                                        <div className="mb-2">
                                            <label className="form-label">Student ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={studentId}
                                                required
                                                disabled
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Amount:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='amount'
                                                value={payment.amount}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Reason</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={payment.reason}
                                                name='reason'
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <button type="submit" className="btn btn-primary w-100 mt-3">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AddPayment