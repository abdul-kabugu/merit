import {useState} from 'react'
import { TypeAnimation } from 'react-type-animation'
import {motion} from 'framer-motion'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Link from 'next/link'
export default function Hero() {
  return (
    <div className='h-[90vh] max-w-[1300px] flex flex-col gap-6 items-center justify-center mx-auto'>
         <h1 className=' text-5xl font-bold  '>Transform how you recognize <br /> meaningful actions with Merit</h1>
          <TypeAnimation  sequence={
            [
                "Proof Of Knowladge",
                 1000,
                 "Credential Verification",
                 1000,
                 "Proof of Attendance",
                 1000,
                 "Access Pass",
                 1000

            ]

            
          }  
          
            className="font-semibold text-3xl "
            wrapper="h2"
            repeat={Infinity}
          />
   <Link href='/create'>
         <motion.div
         whileHover={{scale : 1.2}}
          transition={{duration : 1.2}}
          
           className='flex gap-3 bg-purple-500 py-3 px-8 rounded-lg items-center text-white font-semibold cursor-pointer '
         > <p>Create Merit</p> <AiOutlineArrowRight  size={20}  /> </motion.div> 
         </Link>  
    </div>
  )
}
