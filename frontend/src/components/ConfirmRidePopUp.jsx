import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate

    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
             headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }

    }

    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmRidePopupPanel(false)
            }} className='p-1 text-center w-[93%] absolute top-0'>
                <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-3xl mt-5'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://img.etimg.com/thumb/width-420,height-315,imgsize-24206,resizemode-75,msid-123485291/tech/technology/uber-not-a-holding-company-ceo-dara-khosrowshahi-on-why-he-sold-zomato/dara-khosrowshahi.jpg" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h4>
                </div>
                <h5 className='font-semibold text-lg'>2.2 km</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-copper-coin-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value)
                            }}
                            type="text"
                            className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-4'
                            placeholder='Enter OTP' />
                        <button className='w-full flex items-center justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }} className='w-full mt-1 bg-red-400 text-gray-100 font-semibold p-3 rounded-lg'>Cancle</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
