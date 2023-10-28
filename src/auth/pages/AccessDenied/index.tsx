import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <h2 className="text-primary">Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <p>If you believe this is an error, please contact our support team.</p>
        <Link className="text-primary" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default AccessDenied
