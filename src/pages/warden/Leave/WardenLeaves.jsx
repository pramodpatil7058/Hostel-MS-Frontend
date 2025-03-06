import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../../context/axiosInstance';
import { MyContext } from '../../../context/BackendContext';
import { useNavigate } from 'react-router-dom';

const WardenLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const { user } = useContext(MyContext);
  const navigate = useNavigate();
  const [leave, setLeave] = useState({});
  const changeStatus = (leaveId, status) => {
    console.log(leaveId, status ? "ACCEPTED" : "REJECTED");
    axiosInstance.put("/leave", { leaveId, status }).then(res => { console.log(res.data); setLeave(res.data) }).catch(err => { console.log(err) });
  }

  useEffect(() => {
    axiosInstance.get('/leave').then(res => { console.log(res.data); setLeaves(res.data) }).catch(err => { console.log(err) });
  }, [leave]);
  return (
    <div>
      {
        leaves.length <= 0 ? (<h3 className='text-center mt-5'>You have no Leaves to show</h3>) : (
          <>
            <table className="table table-secondary ">
              <thead>
                <tr className='table-success'>
                  <th className='ps-3' scope="col">Student Id</th>
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
                        <td className='px-4' scope="col">{fromDate}</td>
                        <td className='px-4' scope="col">{toDate}</td>
                        <td className='px-4' scope="col">{reason}</td>
                        {
                          status === null ? (
                            <>
                              <td><button className='btn btn-secondary'>PENDING</button></td>
                              <td>
                                <div className='d-flex justify-content-evenly'>
                                  <button className='btn btn-primary' onClick={() => changeStatus(leave.leaveId, true)} >Accept</button>
                                  <button className='btn btn-danger' onClick={() => changeStatus(leave.leaveId, false)}>Reject</button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              {status === true ? (
                                <td><button className='btn btn-success' >ACCEPTED</button></td>
                              ) : (
                                <td><button className='btn btn-danger'>REJECTED</button></td>
                              )
                              }
                              <td>
                                <div className='d-flex justify-content-evenly'>
                                  <button className='btn btn-primary' onClick={() => navigate(`/leave/view/${leaveId}`)}> View </button>
                                </div>
                              </td>
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
    </div >
  )
}

export default WardenLeaves