import TopNav from '@/components/TopNav'
import { fakeDescription, fakeHeading } from '@/constants'
import React from 'react'

export default function meritId() {
  return (
    <div>
  <TopNav   />
    <div className='bg-purple-100 min-h-[80vh] flex items-center justify-center'>

    <div className='max-w-[1200px] mx-auto border border-purple-300 rounded-lg py-4 px-4 '>
        <div className='flex gap-12  sm:flex-col lg:flex-row items-center justify-center'>
            <div className='max-w-[400px] h-[400px] '>
                <img  src='/img/user-avatar.png' className='w-[100%] h-[100%] rounded-xl'  />
            </div>

              <div className=' lg:max-h-[440px] overflow-y-scroll w-[450px] min-h-[400px] rounded-lg py-3 px-3'>
                <h1 className='font-semibold text-3xl mb-4'>{fakeHeading}</h1>

                 <h3 className='font-semibold text-lg text-black/75 mb-2'>Description</h3>
                  <p className='text-md text-black/60 mb-2'>{fakeDescription}</p>

                  <h3 className='font-semibold text-lg text-black/75 mb-2'>Organization</h3>
                  <p className='text-md text-black/60 mb-2'>kabugu</p>
                  <h3 className='font-semibold text-lg text-black/75 mb-2'>Dates</h3>
                  <p className='text-md text-black/60 mb-2'>2020/12/70</p>
                  <h3 className='font-semibold text-lg text-black/75 mb-2'>Link</h3>
                  <p className='text-md text-black/60 mb-2'>www xyz dot com</p>

                   <button className='bg-purple-500 text-white font-semibold py-2 px-4 w-[100%] mx-auto rounded-lg hover:bg-purple-400'>collect</button>
              </div>
        </div>
    </div>
    </div>
    </div>
  )
}
