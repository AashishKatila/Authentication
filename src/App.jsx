import React from 'react'
import { BrowserRouter ,Routes,Route  } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import './index.css'

const App = () => {
  return (
    <BrowserRouter >
    <Navbar/>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App