import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to='/' ><div className='text-5xl'>Home</div></Link>
        <Link to='/' >Login</Link>
        <Link to='/signup' >Signup</Link>
    </div>
  )
}

export default Navbar