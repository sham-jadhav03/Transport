import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 onClick={() => {
        props.setConfirmRidePanel(false)
      }} className='p-1 text-center w-[93%] absolute top-0'>
        <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png" alt="" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-semibold'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-square-fill"></i>
            <div>
              <h3 className='text-lg font-semibold'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-copper-coin-fill"></i>
            <div>
              <h3 className='text-lg font-semibold'>₹{props.fare[props.vehicleType]}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false)
        }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmRide
