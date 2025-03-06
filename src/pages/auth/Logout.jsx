import React, { useContext } from 'react'
import { MyContext } from '../../context/BackendContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
  const {logout } = useContext(MyContext)
  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center vh-75 mt-5'>
      <h3>Are you sure?</h3>
      <p>Click here to Logout</p>
      <button className='btn btn-danger' onClick={() => logout()}>Logout <i className="fa-solid fa-arrow-right-to-bracket ps-2"></i> </button>
    </div>
  )
}

export default Logout