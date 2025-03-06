import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../../context/BackendContext';
import axiosInstance from '../../../context/axiosInstance';

const StudentPayments = (props) => {
  const { user, userDetails, isLoggedIn, userNotFound, fetchUserPayments } = useContext(MyContext)
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const { studentId } = useParams();
  // const [userPayments, setUserPayments] = useState(payments)
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please sign in.")
      navigate("/")
    }
    else {
      axiosInstance.get(`/student/allPayments/${props.studentId ? props.studentId : user.id}`)
        .then(res => {
          setPayments(res.data);
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [])
  return (
    <div className='container'>
      <h3 className='mt-3 mb-3'>Payments</h3>
      <>
        {
          user.roles === "WARDEN" ? (
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary mb-2" onClick={() => navigate(`/payment/add/${studentId}`)}>Add Payment</button>
            </div>
          ) : (
            <></>)
        }
      </>
      <>
        {
          payments.length <= 0 ? (
            <h3 className='text-center mt-5'>{userDetails.status ? "You have no Payments to show" : "Not Registered for the Hostel"}</h3>
          ) : (
            <>

              <table className="table table-secondary ">
                <thead>
                  <tr className='table-success'>
                    <th className='px-4' scope="col">S Id</th>
                    <th className='px-4' scope="col">Name</th>
                    <th className='px-4' scope="col">Amount</th>
                    <th className='px-4' scope="col">Reason</th>
                    <th className='px-4' scope="col">Status</th>
                    <th className='px-4' scope="col">PayDate</th>
                    <th className='px-4' scope="col">Transaction Id</th>
                    <th className='px-4 text-center' scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    payments.map(payment => {
                      const { amount, payDate, payId, payStatus, reason, studentId, transactionId } = payment;
                      return (
                        <tr key={payId}>
                          <td className='px-4' scope="col">{studentId}</td>
                          <td className='px-4' scope="col">{userDetails.studentName}</td>
                          <td className='px-4' scope="col">{amount}</td>
                          <td className='px-4' scope="col">{reason}</td>
                          {
                            payStatus ? (
                              <>
                                <td className='px-4' scope="col">Completed</td>
                                <td className='px-4' scope="col">{payDate}</td>
                                <td className='px-4' scope="col">{transactionId}</td>

                              </>
                            ) : (
                              <>
                                <td className='px-4' scope="col">Pending</td>
                                <td className='px-4' scope="col">Pending</td>
                                <td className='px-4' scope="col">Pending</td>

                              </>
                            )
                          }
                          {
                            user.roles === "WARDEN" ? (
                              <>
                                <td className='px-4' align='center'>
                                  <button className='btn btn-success w-75' onClick={() => navigate(`/payment/view/${payId}`)}>
                                    View
                                    <i className="fa-solid fa-eye ms-1"></i>
                                  </button>
                                </td>
                              </>
                            ) : (
                              <>
                                {
                                  payStatus ? (
                                    <td className='px-4' align='center'>
                                      <button className='btn btn-success w-75' onClick={() => navigate(`/payment/view/${payId}`)}>
                                        View
                                        <i className="fa-solid fa-eye ms-1"></i>
                                      </button>
                                    </td>
                                  ) : (
                                    <>
                                      <td className='px-4' align='center'>
                                        <button className="btn btn-primary w-75" onClick={() => navigate(`/payment/pay/${payId}`)}>
                                          Pay
                                          <i className="fa-solid fa-file-invoice ms-1"></i>
                                        </button>
                                      </td>
                                    </>
                                  )
                                }
                              </>
                            )
                          }

                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </>
          )
        }
      </>
    </div>
  )
}

export default StudentPayments