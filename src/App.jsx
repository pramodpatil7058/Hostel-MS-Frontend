import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'

import { MyContext } from "./context/BackendContext"
import WardenHome from './pages/warden/WardenHome'
import StudentHome from './pages/student/StudentHome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import StudentPayments from './pages/student/StudentPayments'
import StudentLeaves from './pages/student/StudentLeaves'
import WardenPayments from './pages/warden/WardenPayments'
import WardenLeaves from './pages/warden/WardenLeaves'
import Error from './pages/Error'
import UnAuthorized from './pages/UnAuthorized'

function App() {
  const {fetchUser, user, isLoggedIn } = useContext(MyContext);
  const userRole = user.role

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} />


          <Route exact path='/login' element={<Login />} />


          <Route exact path='/signup' element={<Signup />} />


          <Route exact path='/warden' element={<WardenHome />} />


          <Route exact path='/student' element={<StudentHome />} />
          {
             isLoggedIn && userRole === "ROLE_WARDEN" ?
              (
                <>
                  <Route exact path='/payments' element={<WardenPayments />} />
                  <Route exact path='/leaves' element={<WardenLeaves />} />
                </>
              ) :
              (
                isLoggedIn && userRole === "ROLE_STUDENT" ? (
                  <>
                    <Route exact path='/payments' element={<StudentPayments />} />
                    <Route exact path='/leaves' element={<StudentLeaves />} />
                  </>
                ) : (
                  <>
                    <Route exact path='/payments' element={<UnAuthorized />} />
                    <Route exact path='/leaves' element={<UnAuthorized />} />
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