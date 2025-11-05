import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'



const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({})

  const navigate = useNavigate()



  const { user, setUser } = useContext(UserDataContext)




  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

  }

  return (
    <div className='p-7 h-screen flex flex-col justify-center'>
      <div>
        <img className='w-16 mb-10' src="/logo.svg" alt="logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg  mb-1'>What's your name?</h3>
          <div className='flex gap-4 mb-7'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              type="text"
              placeholder='First name'
            />

            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              type="text"
              placeholder='Last name'
            />
          </div>
          <h3 className='text-lg  mb-2'>What's your email?</h3>
          <input
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg mb-1'>your password</h3>
          <input
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            placeholder='password'
          />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create account</button>
        </form>
        <p className='text-center text-sm'>
          Already have an account? <Link to={"/login"} className='text-blue-600'>Login here</Link>
        </p>

        <div className='mt-[10rem] text-center'>
          <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the
            <span className='underline'>Google Privacy Policy</span>
            and <span className='underline'>Terms of Service</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup