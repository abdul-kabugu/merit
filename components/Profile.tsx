import { testMedia } from '@/constants'
import { PRIMARY_PROFILE } from '@/graphql/queries/getPrimaryProfileByAddress'
import { useQuery } from '@apollo/client'
import {useState} from 'react'
import { useAccount } from 'wagmi'
import {motion} from 'framer-motion'
import { AiOutlineDatabase } from 'react-icons/ai'
export default function Profile() {
    const [currentTab, setcurrentTab] = useState(0)
    const {address} = useAccount()
    const {data, loading, error} = useQuery(PRIMARY_PROFILE, {
        variables : {
            address : address
        }
    })

    console.log("the dtata from profile", data)


     const getCurrentTab = () =>  {
          if(currentTab  === 0) {
            return(
                <div className='flex gap-5 flex-wrap flex-grow-2 flex-shrink-2 items-center justify-center sm:justify-center lg:justify-start'>
                    {testMedia.map((item, i) => {

                        return(
                            <motion.div 
                              whileHover={{scale : 1.1}}
                              transition={{duration : 1.7}}
                            className='cursor-pointer ' key={i}>
                               <video autoPlay loop muted playsInline  className="w-[280px] rounded-lg "  >
                                 <source src={item.cover} />
                               </video>
                                 
                                <h1 className='text-center font-semibold text-xl capitalize text-black/50'>{item.name}</h1>
                            </motion.div>
                        )
                    })}
                </div>
            )
           
          } else if(currentTab === 1 ) {
            return(
            <div className='flex items-center justify-center'>
              <div className='flex flex-col gap-3 items-center justify-center'>
               <AiOutlineDatabase size={40}  />
                <h2>No Data</h2>
                </div>
            </div>
            )
          } 
     }
  return (
    <div className='max-w-[1300px] mx-auto'>
       <div className='h-32  flex gap-4 items-center justify-center'>
          <img src='/img/user-avatar.png' className='w-14 h-14 rounded-full'   />
           <p className='font-semibold text-5xl'>{data?.address?.wallet?.primaryProfile.handle}</p>
       </div>


         <div className='mt-3 flex gap-10'>
             <button onClick={() => setcurrentTab(0) } className={`${currentTab === 0 && "border border-purple-300"} ${currentTab === 0 ? "text-black"  : "text-black/60"} font-semibold text-xl py-1 px-4 rounded-lg`}>Created</button>
             <button onClick={() => setcurrentTab(1)} className={`${currentTab === 1 && "border border-purple-300"} ${currentTab === 1 ? "text-black"  : "text-black/60"} font-semibold text-xl py-1 px-4 rounded-lg`}>Recieved</button>
         </div>
         <div className='mt-8'>
            {getCurrentTab()}
            </div>
    </div>
  )
}
