import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/BackendContext';

const StudentPayments = () => {
  const { isLoggedIn } = useContext(MyContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please sign in.")
      navigate("/")
    }
  },[])
  return (
    <div className='container'>
       {
        isLoggedIn ? (
          <h1>This is Student Payments</h1>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default StudentPayments