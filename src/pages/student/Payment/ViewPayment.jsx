import React from 'react'
import { useParams } from 'react-router-dom'

const ViewPayment = () => {
    const {payId} = useParams();
  return (
    <div>ViewPayment {payId}</div>
  )
}

export default ViewPayment