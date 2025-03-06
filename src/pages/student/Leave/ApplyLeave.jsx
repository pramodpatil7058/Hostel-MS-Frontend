import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MyContext } from '../../../context/BackendContext';
import axiosInstance from '../../../context/axiosInstance';

const ApplyLeave = (props) => {
    const { type } = props;
    const { leaveId } = useParams();
    const { token, user } = useContext(MyContext);
    const [isDisabled, setIsDisabled] = useState(type === "view" ? true : false);
    const navigate = useNavigate();
    const [leave, setLeave] = useState({
        leaveId: 0,
        studentId: user.id,
        fromDate: "",
        toDate: "",
        reason: "",
        status: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    useEffect(() => {
        if (type === "update" || type === "view" && leaveId) {
            axiosInstance.get(`/student/leave/${leaveId}`)
                .then(res => {
                    setLeave(res.data);
                })
                .catch(err => {
                    toast.error("Error: ", err.message)
                })
        }
    }, [])

    const addLeave = (e) => {
        e.preventDefault();
        console.log(leave)
        const leaveData = { reason: leave.reason, fromDate: leave.fromDate, toDate: leave.toDate, studentId: user.id, status: false }
        axiosInstance.post(`/student/leave`, leaveData)
            .then(res => {
                toast.success("Leave Added Successfully")
                navigate("/leaves");
            })
            .catch(err => {
                toast.error("Error: Leave not added")
            })

    }
    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-end">
                <button className='btn btn-primary' onClick={() => navigate("/leaves")}>Back to Leaves</button>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">{type === "apply" ? <>Add Leave</> : (type === "view" ? <>View Leave</> : <>Update Leave</>)}</h3>
                            <form onSubmit={addLeave}>

                                <div className="mb-2">
                                    {
                                        type === "view" ? (
                                            <div className="mb-2">
                                                <label className="form-label">Reason:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name='reason'
                                                    value={leave.reason}
                                                    // onChange={handleChange}
                                                    required
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                        ) : (
                                            <div className="mb-2">
                                                <label className="form-label">Reason:</label>
                                                <select id='reason' name='reason' className='form-control' onChange={handleChange}>
                                                    <option value="Other">--Select Reason--</option>
                                                    <option value="Sick Leave">Sick Leave</option>
                                                    <option value="Family Function">Family Function</option>
                                                    <option value="Institute Outing">Institute Outing</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">From:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='fromDate'
                                        value={leave.fromDate}
                                        required
                                        onChange={handleChange}
                                        placeholder='YYYY-MM-DD'
                                        disabled={isDisabled}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">To:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='toDate'
                                        value={leave.toDate}
                                        onChange={handleChange}
                                        placeholder='YYYY-MM-DD'
                                        disabled={isDisabled}
                                        required
                                    />
                                </div>

                                {type !== "view" && <button className="btn btn-primary w-100 mt-3" type='submit'><i className="fa-solid fa-arrow-right pe-2"></i>{type === "apply" ? <>Add Leave</> : <>Update Leave</>}</button>}
                                <button className="btn btn-secondary w-100 mt-3" type='button' onClick={() => navigate(user.roles==="WARDEN"?`/student/${leave.studentId}/view`:"/leaves")}><i className="fa-solid fa-arrow-left pe-2"></i>Back to Leaves</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyLeave