import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'

import { MyContext } from "./context/BackendContext"
import WardenHome from './pages/warden/WardenHome'
import StudentHome from './pages/student/StudentHome'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/Home'
import Error from './pages/Error'
import UnAuthorized from './pages/UnAuthorized'
import { ToastContainer } from 'react-toastify'
import Register from './pages/student/Register'
import StudentLeaves from './pages/student/Leave/StudentLeaves'
import Pay from './pages/student/Payment/Pay'
import StudentPayments from './pages/student/Payment/StudentPayments'
import WardenPayments from './pages/warden/Payments/WardenPayments'
import AddPayment from './pages/warden/Payments/AddPayment'
import ApplyLeave from './pages/student/Leave/ApplyLeave'
import ViewLeave from './pages/student/Leave/ViewLeave'
import WardenStudents from './pages/warden/students/WardenStudents'
import Logout from './pages/auth/Logout'
import StudentDetails from './pages/warden/students/StudentDetails'
import WardenLeaves from './pages/warden/Leave/WardenLeaves'

function App() {
  const { user, auth, fetchUser, isLoggedIn } = useContext(MyContext);

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position='top-center' />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} />


          <Route exact path='/login' element={<Login />} />


          <Route exact path='/signup' element={<Signup />} />

          <Route exact path='/logout' element={<Logout />} />

          {
            isLoggedIn && user.roles === "WARDEN" ?
              (
                <>
                  <Route exact path='/userhome' element={<WardenHome />} />
                  <Route exact path='/payments' element={<WardenPayments type="all"/>} />
                  <Route exact path='/payments/:studentId' element={<WardenPayments type="student"/>} />
                  <Route exact path='/leaves' element={<WardenLeaves />} />
                  <Route exact path='/students' element={<WardenStudents />} />
                  <Route exact path='/payment/view/:studentId/:payId' element={<Pay values={{ type: "view" }} />} />
                  <Route exact path='/student/:studentId/view' element={<StudentDetails />} />
                  <Route exact path='/payment/view/:payId' element={<Pay values={{ type: "view" }} />} />
                  <Route exact path='/payment/add/:studentId' element={<AddPayment />} />
                  <Route exact path='/leave/view/:leaveId' element={<ApplyLeave type="view" />} />
                </>
              ) :
              (
                isLoggedIn && user.roles === "USER" ? (
                  <>
                    <Route exact path='/userhome' element={<StudentHome />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/updateUser' element={<Register />} />
                    <Route exact path='/payments' element={<StudentPayments />} />
                    <Route exact path='/payment/pay/:payId' element={<Pay values={{ type: "pay" }} />} />
                    <Route exact path='/payment/view/:payId' element={<Pay values={{ type: "view" }} />} />
                    <Route exact path='/leaves' element={<StudentLeaves />} />
                    <Route exact path='/leave/add' element={<ApplyLeave type= "apply"  />} />
                    <Route exact path='/leave/update/:leaveId' element={<ApplyLeave type= "update"/>} />
                    <Route exact path='/leave/view/:leaveId' element={<ApplyLeave type="view" />} />
                  </>
                ) : (
                  <>
                    <Route exact path='/userhome' element={<UnAuthorized />} />
                    <Route exact path='/payments' element={<UnAuthorized />} />
                    <Route exact path='/leaves' element={<UnAuthorized />} />
                    <Route exact path='/leave/*' element={<UnAuthorized />} />
                    <Route exact path='/payment/*' element={<UnAuthorized />} />
                  </>
                )
              )
          } 


          <Route path='/*' element={<Error />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App