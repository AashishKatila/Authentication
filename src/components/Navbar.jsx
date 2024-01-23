import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-center mt-10 mb-6'>
        <Link to='/' ><div className='text-xl mx-4 '>Login</div></Link>
        <Link to='/signup' ><div className='text-xl mx-4'>Signup</div></Link>
        {/* <Link to='/profile' ><div className='text-xl mx-4'>Profile</div></Link> */}
    </div>
  )
}

export default Navbar