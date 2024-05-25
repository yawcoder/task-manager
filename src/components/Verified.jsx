import React from 'react'
import { Link } from 'react-router-dom'

const Verified = () => {

  return (
    <div>
        <p>Email has being verified. Click the button below to login</p>
        <Link to="/login"><button>Login</button></Link>
    </div>
  )
}

export default Verified