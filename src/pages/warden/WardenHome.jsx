import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../context/BackendContext'

const WardenHome = () => {
  const { isLoggedIn } = useContext(MyContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please sign in.")
      navigate("/")
    }
  },[])
  return (
    <>
      {
        !isLoggedIn ? (
          <div></div>
        ) : (
          <div className="container">
            This is warden Home
          </div>
        )
      }

    </>
  )
}

export default WardenHome