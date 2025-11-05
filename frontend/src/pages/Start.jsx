import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
    return (
        <>
            <div className='bg-cover bg-center bg-[url("/background.jpg")] h-screen pt-8 flex justify-center flex-col w-full bg-red-200'>
                <img className='w-16 ml-8 mb-[490px]' src="/logo.svg" alt="logo" />
                <div className='bg-white pb-10 py-4 px-4'>
                    <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </>
    )
}

export default Start
