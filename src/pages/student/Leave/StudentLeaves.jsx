import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../../context/BackendContext';
import axiosInstance from '../../../context/axiosInstance';

const StudentLeaves = (props) => {
  const { isLoggedIn, isLoading, userNotFound, user } = useContext(MyContext)
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please sign in.")
      navigate("/")
    } else {
      axiosInstance.get(`/student/leave/getLeavesByStudentId/${props.studentId ? props.studentId : user.id}`)
        .then(res => {
          setLeaves(res.data);
        }).catch(err => {
          console.log("Cannot fetch user leaves")
        })
    }
  }, [])


  return (
    <div className='container'>
      {
        userNotFound && user.roles==="USER" ? (
          <h3 className='text-center mt-5'>You have not Registered for the Hostel</h3>
        ) : (
          <>
            <h3 className='mt-3 mb-3'>Leaves</h3>
            {
              user.roles === "USER" ? (<div className="d-flex w-100 justify-content-end">
                <button className='btn btn-success me-0 mb-2' onClick={() => navigate('/leave/add')}>New Leave</button>
              </div>) : (
                <></>
              )
            }

            {
              leaves.length <= 0 ? (<h3 className='text-center mt-5'>You have no Leaves to show</h3>) : (
                <>
                  <table className="table table-secondary ">
                    <thead>
                      <tr className='table-success'>
                        <th className='ps-3' scope="col">Student Id</th>
                        <th className='pe-3 ' scope="col">Name</th>
                        <th className='px-4' scope="col">From</th>
                        <th className='px-4' scope="col">To</th>
                        <th className='px-4' scope="col">Reason</th>
                        <th className='px-4' scope="col">Status</th>
                        <th className='px-4 text-center' scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        leaves.map(leave => {
                          const { leaveId, studentId, reason, fromDate, toDate, status } = leave;
                          return (
                            <tr key={leaveId}>
                              <td className='px-4' scope="col">{studentId}</td>
                              <td className='px-4' scope="col">{user.name}</td>
                              <td className='px-4' scope="col">{fromDate}</td>
                              <td className='px-4' scope="col">{toDate}</td>
                              <td className='px-4' scope="col">{reason}</td>
                              {
                                status === null ? (
                                  <td><button className='btn btn-secondary'>PENDING</button></td>
                                ) : (
                                  status === true ? (
                                    <td><button className='btn btn-success'>ACCEPTED</button></td>
                                  ) : (
                                    <td><button className='btn btn-danger'>REJECTED</button></td>
                                  )
                                )
                              }
                              <td>
                                <div className='d-flex justify-content-evenly'>
                                  {

                                    status === null && user.roles === "USER" ? (
                                      <button className='btn btn-primary' onClick={() => navigate(`/leave/update/${leaveId}`)}> Edit </button>
                                    ) : (
                                      <></>
                                    )
                                  }
                                  <button className='btn btn-primary' onClick={() => navigate(`/leave/view/${leaveId}`)}> View </button>
                                </div>
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
    </div>
  )
}

export default StudentLeaves