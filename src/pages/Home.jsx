import React, { useContext } from 'react'

import "../App.css"
import { MyContext } from '../context/BackendContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, isLoggedIn, userNotFound } = useContext(MyContext)
  const navigate = useNavigate();
  if(!user) {
    navigate("/login")
  }
  return (
    <>
      <section class="hero">
        <div class="container cp-20">
          <h1>Welcome to CTS Hostel</h1>
          <p>Your comfort is our priority</p>
          {
            user.roles === "WARDEN" ? <></> : (
              <>
                {
                  !isLoggedIn ? (
                    <section class="container my-5">
                      <div class="row text-center">
                        <div class="d-flex justify-content-evenly">
                          <a href="signup" class="btn btn-primary btn-lg w-25">Sign Up</a>
                          <a href="/login" class="btn btn-primary btn-lg w-25">Login</a>
                        </div>
                      </div>
                    </section>
                  ) : (
                    isLoggedIn && userNotFound ? (
                      <a href="/register" class="btn btn-primary btn-lg">Register For Hostel</a>
                    ) : (
                      <></>
                    )
                  )
                }
              </>
            )
          }

        </div>
      </section>

      <section class="container my-5">
        <div class="row text-center">
          <div class="col-lg-4">
            <div class="feature-icon mb-3">
              <i class="bi bi-wifi"></i>
            </div>
            <h3>Free Wi-Fi</h3>
            <p>Enjoy high-speed internet access throughout the hostel.</p>
          </div>
          <div class="col-lg-4">
            <div class="feature-icon mb-3">
              <i class="bi bi-basket"></i>
            </div>
            <h3>Dining Facilities</h3>
            <p>Delicious meals available at our in-house restaurant.</p>
          </div>
          <div class="col-lg-4">
            <div class="feature-icon mb-3">
              <i class="bi bi-heart"></i>
            </div>
            <h3>Comfortable Rooms</h3>
            <p>Relax and unwind in cozy and well-furnished rooms.</p>
          </div>
        </div>
      </section>

      <footer class="bg-dark text-white text-center py-4">
        <div class="container">
          <p>&copy; 2025 CTS. All rights reserved.</p>
          <p>
            <a href="#" class="text-white">Privacy Policy</a> |
            <a href="#" class="text-white">Terms of Service</a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home