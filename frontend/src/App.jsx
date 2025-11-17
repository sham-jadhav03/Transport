import React from 'react'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import Home from './pages/Home'
import UserProtectWrapper from './wrappers/UserProtectWrapper'
import CaptainProtectWrapper from './wrappers/CaptainProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<Userlogin />} />
      <Route path='/riding' element={<Riding />} />
      <Route path='/captain-riding' element={<CaptainRiding />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/captain-signup' element={<CaptainSignup />} />
      <Route path='/captain-login' element={<Captainlogin />} />
      <Route path='/home' element={
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
      } />
      <Route path='/users/logout' element={
        <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
      } />
      <Route path='/captain-home' element= {
        <CaptainProtectWrapper>
          <CaptainHome />
        </CaptainProtectWrapper>
      } />
      <Route path='/captains/logout' element= {
        <CaptainProtectWrapper>
          <CaptainLogout/>
        </CaptainProtectWrapper>
      } />
    </Routes>
    

  )
}

export default App
