import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/BackendContext'
import { Link, useNavigate } from 'react-router-dom';
import WardenRoutes from './routes/WardenRoutes';
import StudentRoutes from './routes/StudentRoutes';
import CommonRoutes from './routes/CommonRoutes';

function Navbar() {

    const { isLoggedIn, userNotFound, user, logout } = useContext(MyContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Hostel</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" >
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                isLoggedIn ? (
                                    <>
                                        <CommonRoutes />
                                        {
                                            user.roles === "WARDEN" ? (
                                                <WardenRoutes />
                                            ) : (
                                                <>
                                                    {
                                                        user.roles === "USER" ? (
                                                            <StudentRoutes />
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </>
                                            )
                                        }

                                        <li className="nav-item me-2">
                                            <Link className="nav-link " to="/logout">Logout</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item me-2">
                                            <Link className="nav-link " aria-current="page" to="/signup">Signup</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " aria-current="page" to="/login">Login</Link>
                                        </li>
                                    </>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar