import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/BackendContext';
import axiosInstance from '../../context/axiosInstance';
import { toast } from 'react-toastify';

const StudentHome = () => {
  const { isLoggedIn, user, userNotFound, userDetails, fetchUser, logout } = useContext(MyContext)
  const navigate = useNavigate();
  const [showChangePass, setShowChangePass] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const deleteUser = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      axiosInstance.delete(`/student/deleteStudent/${user.id}`)
        .then(res => {
          console.log(res.data)
          setDeleteSuccess(true);
        })
        .catch(err => { console.log(err) });
    }

    axiosInstance.delete(`/auth/delete/${user.id}`)
      .then(res => {
        console.log(res.data);
        logout();
      }).catch(err => { console.log(err) })

  }

  const changePassword = (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(data);
    axiosInstance.put("auth/changePass", { oldPass: data.oldPassword, newPass: data.newPassword })
      .then(res => {
        setData({});
        toast.success("Password Changed Successfully");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        logout();
      }).catch(err => { console.log(err) });
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You are not logged in. Please sign in.")
      navigate("/")
    } else {
      fetchUser();
    }
  }, [])
  return (
    <>
      {
        isLoggedIn ? (
          <>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Hello, {userDetails.studentName ? userDetails.studentName : user.name}</h3>
              </div>
              {userNotFound ? (
                <>
                  <div className="card-body">
                    <h5>You have not registered for hostel, Please apply to move further</h5>
                    <Link to="/register">
                      <button className='btn btn-primary'>Register</button>
                    </Link>
                  </div>
                </>
              ) : (
                <>

                  <div className="card-body">
                    <h5 className="card-title mb-3">{userDetails.about}</h5>
                    <h6 className="card-subtitle mb-3"> <strong>Email : </strong> {user.email}</h6>
                    <p className="card-text mb-3"> <strong>Branch : </strong> {userDetails.branch ? userDetails.branch : "NA"}</p>
                    <p className="card-text mb-3"> <strong>Address : </strong> {userDetails.address ? userDetails.address : "NA"}</p>
                    <div className=' d-flex justify-content-evenly mt-5 mb-3'>
                      <Link to="/updateUser" className="btn btn-primary w-25">Update</Link>
                      <Link to="/payments" className="btn btn-primary w-25">Your Payments</Link>
                      <Link to="/leaves" className="btn btn-primary w-25">Your Leaves</Link>
                    </div>
                  </div>
                  <div className='card-header w-100 d-flex flex-column align-items-start mt-5 ps-5'>
                    <h3 className='card-title'>Account Settings</h3>
                    <button className='w-50 btn btn-success mt-5 mb-5' onClick={() => setShowChangePass(showChangePass ? false : true)}>Change Password</button>
                    {
                      showChangePass && <div className="card card-body w-100 d-flex flex-column align-items-center ">
                        <div className="mb-3 w-50">
                          <label htmlFor="oldPassword" className="form-label">Old Password</label>
                          <input type="password" className="form-control" name="oldPassword" onChange={handleChange} />
                        </div>
                        <div className="mb-3 w-50">
                          <label htmlFor="newPassword" className="form-label">New Password</label>
                          <input type="password" className="form-control" name="newPassword" onChange={handleChange} />
                        </div>
                        <div className="mb-3 w-50">
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                          <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} />
                        </div>
                        <button className='btn btn-danger w-25 mb-3' onClick={changePassword}>Change Password</button>
                        <button className='btn btn-primary w-25' onClick={() => setShowChangePass(false)}>Cancel</button>
                      </div>
                    }
                    <button className='w-50 btn btn-danger mt-5 mb-3' onClick={deleteUser}>Delete My Account</button>
                  </div>
                </>
              )}

            </div>
          </>
        ) : (
          <>
            {<Navigate to={'/login'} replace />}
          </>
        )
      }
    </>
  )
}

export default StudentHome