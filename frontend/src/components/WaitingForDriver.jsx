import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setWaitingForDriver(false)
            }} className='p-1 text-center w-[93%] absolute top-0'>
                <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>

            <div className='flex items-center justify-between'>
                <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                    <p className='text-xs text-gray-600'>Mercedes-Benz C-Class</p>
                    <h2 className='text-sm'><i className="text-lg ri-star-s-fill"></i>4.8</h2>
                    <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
                </div>
            </div>

            <div className="mt-5 flex items-center bg-[#eee] rounded-full w-1/2 px-3">
                <input
                    type="text"
                    placeholder="Send a message..."
                    className="bg-[#eee] flex-1 py-2 px-3 rounded-full focus:outline-none"
                />
                <button className="text-gray-600 hover:text-black">
                    ➤
                </button>
            </div>
            <div className="flex items-center justify-center gap-12 mt-14">
                <div className="flex flex-col items-center text-center">
                    <i className="ri-shield-star-fill text-3xl"></i>
                    <p>Safety</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <i className="ri-flight-takeoff-line text-3xl"></i>
                    <p>Share my trip</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <i className="ri-phone-line text-3xl"></i>
                    <p>Call driver</p>
                </div>
            </div>

            <div className='border-t-2 mt-10'></div>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default WaitingForDriver
