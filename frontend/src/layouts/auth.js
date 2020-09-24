import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout" style={{ background: 'green' }}>
      AuthLayout
      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
