import React from 'react'
import { MdLock } from "react-icons/md";
import { FaCircleDot } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className='py-4 lg:my-20'>
        <div className='flex flex-col gap-5 items-center text-center'>
          <h1 className='text-3xl lg:text-7xl text-[#263c48]'>Detect. Analyze. Mitigate</h1>
          <p className='text-sm lg:text-lg text-[#546871] lg:max-w-[60%]'> Unbiasfy helps you uncover hidden biases in your data and models, providing tools to identify and address disparities that can impact decision-making and results.</p>
          <div className='my-5 text-sm text-[#bfccd1] flex items-center gap-3'>
             <FaCircleDot /> 
             <div className='w-5 border-t-2 border-[#bfccd1]'></div>
             <FaCircleDot /> 
             <div className='w-5 border-t-2 border-[#bfccd1]'></div>
             <div className='p-2 rounded-full bg-white flex items-center justify-center shadow-xl'> <MdLock className='text-xl'/></div>
           
            <div className='w-5 border-t-2 border-[#bfccd1]'></div>
            <FaCircleDot /> 
            <div className='w-5 border-t-2 border-[#bfccd1]'></div>
            <FaCircleDot /> 
          </div>
          <div className='w-full flex items-start justify-between flex-wrap gap-4'> 
            <div className='lg:w-[24%] w-full h-[250px] bg-[#f3f7f9] border-4 border-white rounded-[3rem] shadow-xl flex items-center flex-col p-5'>
              <h2 className='text-xl font-semibold text-[#263c48]'>Fairness Score & Metrics</h2>
            </div>
            <div className='lg:w-[48%] w-full lg:h-[350px] h-[250px] bg-[#f3f7f9] border-4 border-white rounded-[3rem] shadow-xl'></div>
            <div className='lg:w-[24%] w-full h-[250px] bg-[#f3f7f9] border-4 border-white rounded-[3rem] shadow-xl'></div>
          </div>
        </div>
        
    </div>
  )
}

export default Hero