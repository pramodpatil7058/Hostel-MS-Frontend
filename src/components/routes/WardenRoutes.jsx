import React from 'react'
import { Link } from 'react-router-dom'

const WardenRoutes = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/students">Students</Link>
            </li>
        </>
    )
}

export default WardenRoutes