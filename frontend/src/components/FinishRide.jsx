import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const FinishRide = (props) => {
    const navigate = useNavigate();

    async function endRide() {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {      
            navigate('/captain-home')
        }
    }


        return (
            <div>
                <h5 onClick={() => {
                    props.setfinishRidePanel(false)
                }} className='p-1 text-center w-[93%] absolute top-0'>
                    <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
                </h5>
                <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

                <div className='flex items-center justify-between p-3 bg-yellow-100 rounded-3xl mt-5'>
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

                    <div className='mt-10 w-full'>
                        <button
                            onClick={endRide}
                            className='w-full flex items-center justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>
                    </div>
                </div>
            </div>
        )
}
    export default FinishRide