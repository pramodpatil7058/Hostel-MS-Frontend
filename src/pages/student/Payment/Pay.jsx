
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { MyContext } from '../../../context/BackendContext';
import axiosInstance from '../../../context/axiosInstance';

const Pay = (props) => {
    const { studentId,payId } = useParams();
    const { values } = props;
    const {user, userDetails ,setUserDetails} = useContext(MyContext)
    const [isDisabled, setIsDisabled] = useState(values.type === "pay" ? false : true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    const [data, setData] = useState({
        payId: payId,
        amount: 0,
        studentId: 0,
        payDate: "",
        reason: "",
        transactionId: "",
        payStatus: false
    });

    useEffect(() => {
        if(userDetails.roles ==="WARDEN"){
            axiosInstance.get(`/student/${studentId}`)
            .then(res=>setUserDetails(res.data))
            .catch(err=>toast.error("Cannot fetch user"));
        }
        axiosInstance.get(`/student/payment/${payId}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                toast.error(err.message);
            })
    }, [payId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const makePayment = (e) => {
        e.preventDefault();
        if (data.transactionId === "" || data.payDate === "") {
            toast.error("Please fill all the fields")
        }
        else {
            axiosInstance.put(`/student/payment`, data)
                .then(res => {
                    
                    toast.success("Payment Updated SuccessFully")
                    setIsSuccess(true)
                    navigate("/payments")
                })
                .catch(err => {
                   
                    setIsSuccess(false)
                    setData(prevData => ({
                        ...prevData,
                        transactionId: "",
                    }))
                    if (err.status === 500) {
                        toast.error("Server Error")
                    } else if (err.status === 404) {
                        toast.error("Invalid Payment")
                    } else {
                        toast.error("Something went wrong")
                    }
                })
        }
    }
    return (
        <>
            <div className="container background-blue">
                {
                   
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-6">
                                <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                                    <div className="card-body">
                                        <h3 className="card-title text-center mb-4">Payment</h3>
                                        <form onSubmit={makePayment}>
                                            <div className="mb-2">
                                                <label className="form-label">Student Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={userDetails.studentName}
                                                    required
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Amount:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={data.amount}
                                                    required
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Reason</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={data.reason}
                                                    required
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Transaction Id (UPI/Challan No.):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name='transactionId'
                                                    value={data.transactionId}
                                                    onChange={handleChange}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Payment Date:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name='payDate'
                                                    value={data.payDate}
                                                    onChange={handleChange}
                                                    disabled={isDisabled}
                                                    placeholder='YYYY-MM-DD'
                                                />
                                            </div>
                                            {
                                                values.type === "pay" ? (
                                                    <div className="d-flex flex-column">
                                                        <button type="submit" className="btn btn-primary w-100 mt-3">Pay<i class="fa-solid fa-arrow-right ps-2"></i></button>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                            <button className="btn btn-secondary w-100 mt-3" type='button' 
                                                onClick={() => navigate(user.roles==="WARDEN"?`/student/${data.studentId}/view`:`/payments`)}>
                                                    <i class="fa-solid fa-arrow-left pe-2"></i>
                                                    Back to Payments
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>

    )
}

export default Pay