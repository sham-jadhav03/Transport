import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }} className='p-1 text-center w-[93%] absolute top-0'>
                <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>New ride available!</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-3xl mt-5'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://img.etimg.com/thumb/width-420,height-315,imgsize-24206,resizemode-75,msid-123485291/tech/technology/uber-not-a-holding-company-ceo-dara-khosrowshahi-on-why-he-sold-zomato/dara-khosrowshahi.jpg" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname+ "" +props.ride?.user.fullname.lastname}</h4>
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
                <div className='flex mt-5 w-full items-center justify-between'>
                     <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }} className='bg-gray-400 text-gray-100 font-semibold p-3 px-8 rounded-lg'>Ingore</button>
                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }} className='bg-green-600 text-white font-semibold p-3 px-8 rounded-lg'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
