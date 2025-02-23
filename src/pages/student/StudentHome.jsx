import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/BackendContext';

const StudentHome = () => {
  const { isLoggedIn,user } = useContext(MyContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please sign in.")
      navigate("/")
    }
  }, [])
  return (
    <>
      {
        isLoggedIn ? (
          <>
            <div class="card">
              <div class="card-body">
                {user.studentName}
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default StudentHome