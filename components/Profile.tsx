// @ts-nocheck
import { testMedia } from '@/constants'
import { PRIMARY_PROFILE } from '@/graphql/queries/getPrimaryProfileByAddress'
import { useQuery } from '@apollo/client'
import {useState} from 'react'
import { useAccount } from 'wagmi'
import {motion} from 'framer-motion'
import { AiOutlineDatabase } from 'react-icons/ai'
import { useGetUserEssencies } from '@/hooks'
import Link from 'next/link'

export default function Profile() {
    const [currentTab, setcurrentTab] = useState(0)
    const {address} = useAccount()
    const {data, loading, error} = useQuery(PRIMARY_PROFILE, {
        variables : {
            address : address
        }
    })
       const theUserProfId = data?.address?.wallet?.primaryProfile?.profileID
      const {badges, isBadgesLoading, isBadgesError} = useGetUserEssencies(theUserProfId, "meritone")
    console.log("the dtata from profile", badges)


     const getCurrentTab = () =>  {
          if(currentTab  === 0) {
            return(
                <div className='flex gap-5 flex-wrap flex-grow-2 flex-shrink-2 items-center justify-center sm:justify-center lg:justify-start'>
                    {badges?.profileByID.essences?.edges.map((item, i) => {
                        const  imgUrl = item?.node?.metadata?.media[0].media_url
                        const itemId  = item?.node?.metadata?.metadata_id
                        return(
                          <Link href={`/collect/${itemId}`} key={i}> <motion.div 
                              whileHover={{scale : 1.1}}
                              transition={{duration : 1.7}}
                            className='cursor-pointer ' key={i}>
                               {/*<video autoPlay loop muted playsInline  className="w-[280px] rounded-lg "  >
                                 <source src={item.cover} />
                        </video>*/}
                          <img  src={imgUrl}    className="w-[310px] h-[220px] rounded-lg object-cover ring-2 ring-purple-300"    />
                                 
                                <h1 className='text-center font-semibold text-xl capitalize text-black/50'>{item.name}</h1>
                            </motion.div>
                            </Link> 
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
