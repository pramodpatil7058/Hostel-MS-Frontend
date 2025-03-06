import React from 'react'
import { Link } from 'react-router-dom'

const StudentRoutes = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/userhome">User</Link>
            </li>
        </>
    )
}

export default StudentRoutes