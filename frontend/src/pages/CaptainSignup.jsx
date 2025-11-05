import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }


  return (
     <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
         <img className='w-14 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg  mb-1'>What's our captain's name?</h3>
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
          <h3 className='text-lg  mb-2'>What's our captain's email?</h3>
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

          <h3 className='text-lg mb-1'>Vehicle Information</h3>
          <div className='flex gap-4 mb-4'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              type="text"
              placeholder='vehicle color'
            />
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              type="text"
              placeholder='vehicle plate number'
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              type="number"
              placeholder='passenger capacity'
            />
            <select
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-sm'
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain account</button>
        </form>
        <p className='text-center text-sm'>
          Already have an account? <Link to={"/captain-login"} className='text-blue-600'>Login here</Link>
        </p>

        <div className='mt-[1.5rem] text-center'>
          <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the
            <span className='underline'>Google Privacy Policy</span>
            and <span className='underline'>Terms of Service</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
