import React from 'react'
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-6 lg:mx-20 border-b-2 '>
        <img src={Logo} alt="" className='lg:w-[150px] w-[100px]'/>
        <ul className='hidden lg:flex items-center justify-center gap-8 text-lg text-[#546871]'>
            <li className='cursor-pointer hover:border-b-2'>About</li>
            <li className='cursor-pointer hover:border-b-2'>Features</li>
            <li className='cursor-pointer hover:border-b-2'>How It Works</li>
            <li className='cursor-pointer hover:border-b-2'>Help</li>
        </ul>
        <div className='w-[100px] lg:w-[150px] flex justify-end items-center text-center'>
            <div className='rounded-full py-2 px-7 shadow-xl bg-white text-[#364b56] font-semibold cursor-pointer hover:bg-[#e5ebee] transition duration-300' >
                Start
            </div>
        </div>
    </div>
  )
}

export default Navbar