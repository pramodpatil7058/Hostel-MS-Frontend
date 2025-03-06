import React from 'react'
import { Link } from 'react-router-dom'

const CommonRoutes = () => {
  return (
    <>
            <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/leaves">Leaves</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/payments">Payments</Link>
            </li>
        </>
  )
}

export default CommonRoutes