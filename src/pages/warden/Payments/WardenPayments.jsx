import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../context/BackendContext';
import { toast } from 'react-toastify';
import axiosInstance from '../../../context/axiosInstance';
import { useNavigate } from 'react-router-dom';

const WardenPayments = (props) => {

  const { type } = props
  const { isLoggedIn, userNotFound, userDetails } = useContext(MyContext);
  const [payments, setPayments] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("You are not logged in. Please sign in.")
      navigate("/")
    } else {
      let url = "";
      if (type === "student") {
        url = `/student/allPayments/${localStorage.getItem("studentId")}`
      } else {
        url = "/warden/getAllPayments"
      }

      axiosInstance.get(url)
        .then(res => {
          setPayments(res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])
  return (
    <>
      {
        payments.length <= 0 ? (<>
          <h4> There are no payments to show</h4>
          {
            type === "student" ? (
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => navigate(`/payment/add/${studentId}`)}>Add Payment</button>
              </div>
            ) : (<></>)
          }
        </>
        ) : (
          <>

            <h3 className='mt-3 mb-3'>Payments</h3>


            <table className="table table-secondary ">
              <thead>
                <tr className='table-success'>
                  <th className='px-4' scope="col">S Id</th>
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
                        <td className='px-4' align='center'>
                          <button className='btn btn-success w-75' onClick={() => {
                            navigate(`/payment/view/${studentId}/${payId}`)
                            localStorage.setItem("studentId", studentId);
                          }}>
                            View
                            <i className="fa-solid fa-eye ms-1"></i>
                          </button>
                        </td>

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
  )
}

export default WardenPayments