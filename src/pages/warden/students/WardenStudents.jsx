import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { MyContext } from '../../../context/BackendContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../context/axiosInstance';

const WardenStudents = () => {
  const [students, setStudents] = useState([]);
  const { user } = useContext(MyContext)
  const navigate = useNavigate()
  useEffect(() => {
    axiosInstance.get("/student/getAllStudents")
      .then(res => {
        setStudents(res.data)
      })
      .catch(err => {
        toast.error("Cannot fetch students data");
      })
  },[])
  return (
    <div className='container-fluid'>

      <>
        <table className="table table-secondary ">
          <thead>
            <tr className='table-success'>
              <th className='ps-4' scope="col">Student Id</th>
              <th className='pe-4 ' scope="col">Name</th>
              <th className='px-4' scope="col">Branch</th>
              <th className='px-4' scope="col">Year of Study</th>
              <th className='px-4 ' scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map(student => {
                const { studentId, studentName,branch, yos } = student;
                return (
                  <tr key={studentId}>
                    <td className='px-4' scope="col">{studentId}</td>
                    <td className='px-4' scope="col">{studentName}</td>
                    <td className='px-4' scope="col">{branch?branch:"NA"}</td>
                    <td className='px-4' scope="col">{yos?yos:"NA"}</td>
                    <td className='px-4' scope="col">
                      <button className='btn btn-primary' onClick={()=>{
                        navigate(`/student/${studentId}/view`)
                      }}>View</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    </div>
  )
}

export default WardenStudents