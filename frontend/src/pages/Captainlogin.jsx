import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const Captainlogin = () => {

 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {captain, setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate() 
 

  const submitHandler = async (e) => {
    e.preventDefault()
    const captain ={
      email: email,
      password: password
    }
 
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

   if(response.status === 200){
    const data = response.data;
    setCaptain(data.captain)
    localStorage.setItem('token', data.token)
    navigate('/captain-home') 
   }


    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-center'>
      <div>
        <img className='w-16 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg  mb-1'>What's your email?</h3>
          <input
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg mb-1'>your password</h3>
          <input
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            type="password"
            placeholder='password'
          />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center text-sm'>
          Join as captain? <Link to={"/captain-signup"} className='text-blue-600'>Register as a Captain</Link>
        </p>
      </div>
      <div className='mt-60'>
        <Link
          to={"/login"}
          className='bg-[#b43910] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin
