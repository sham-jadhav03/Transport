import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false)
            }} className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex items-center border-2 active:border-black mb-2 rounded-xl w-full justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 min away</h5>
                    <p className='font-medium text-xs text-gray-700'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold mr-4'>₹{props.fare.car}</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }} className='flex items-center border-2 active:border-black mb-2 rounded-xl w-full justify-between'>
                <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>2 min away</h5>
                    <p className='font-medium text-xs text-gray-700'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold mr-4'>₹{props.fare.moto}</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className='flex items-center border-2 active:border-black mb-2 rounded-xl w-full justify-between'>
                <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Uberauto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 min away</h5>
                    <p className='font-medium text-xs text-gray-700'>Affordable auto rides</p>
                </div>
                <h2 className='text-lg font-semibold mr-4'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
