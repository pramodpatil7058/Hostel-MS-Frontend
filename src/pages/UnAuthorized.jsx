import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnAuthorized = () => {
    const navigate = useNavigate()
    return (
        <div className='container mt-5' align="center">
            <h1 className='mt-5 mb-3'>401</h1>
            <h3 className='mb-3'>Something Went Wrong.</h3>
            <h4 className='mb-3'>You Are Not Authorized to Access This page. Please Sign In.</h4>
            <div className=' mt-5 w-50 d-flex justify-content-evenly'>
                <button onClick={()=>navigate("/login")} className="btn btn-primary">Login</button>
                <button onClick={()=>navigate("/signup")} className="btn btn-primary">Register</button>
            </div>
        </div>
    )
}

export default UnAuthorized