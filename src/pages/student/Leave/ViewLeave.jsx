import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ViewLeave = (props) => {
    const {leaveId} = useParams();
    const navigate = useNavigate();
    const {values} = props;
  return (
    <div>
        ViewLeave {leaveId}
        <button className='btn btn-success' onClick={()=>navigate(`/leave/update/${leaveId}`)}>Update</button>
    </div>
  )
}

export default ViewLeave