// @ts-nocheck
import { topNavOptions } from '@/constants'
import { useAuthenticate } from '@/hooks'
import { ConnectButton, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import {useState, useEffect} from 'react'
import { useAccount, useChainId, useSignMessage } from 'wagmi'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {AiFillSetting, AiOutlineLogout} from 'react-icons/ai'
import {motion} from 'framer-motion'
import { useQuery } from '@apollo/client'
import { PRIMARY_PROFILE } from '@/graphql/queries/getPrimaryProfileByAddress'
import Link from 'next/link'

export default function TopNav() {
  const [accessTokensValue, setAccessTokensValue] = useState();
  const [isShowMenu, setisShowMenu] = useState(false)
    const {openConnectModal} = useConnectModal()
    const {generateMessage, authenticate} = useAuthenticate()
   const {signMessageAsync} = useSignMessage()
   const {address, isConnected } = useAccount()
   const chainId = useChainId();
     //  handle cc authentication

       const {data, loading, error} = useQuery(PRIMARY_PROFILE, {
        variables : {
          address : address
        }
       })

         console.log("the user  of  currnt", data)
     const  handleSignInWithCC = async () =>  {
      if(! isConnected) {
       alert("connect  wallet  first")
      }
      const message = await generateMessage(address)
       const signuture = await signMessageAsync({message : message})
       const accessToken = await authenticate(address, signuture)
       window.localStorage.setItem('accessToken', accessToken);
      console.log("the access token", accessToken)
   }

    // check  if  user  is  authenticated  
    
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('accessToken');
        setAccessTokensValue(storedValue);
      }
    }, []);

       const  getCurrentAuthState = () =>  {
          if(accessTokensValue ){
            return(
             <div className=' relative' >
                 <div className='border border-gray-300 rounded-lg flex items-center gap-4  py-2 px-4 cursor-pointer' onClick={() => setisShowMenu(! isShowMenu)}>
                 <img    src='/avatar-placeholder.svg' 
                  className='w-5 h-5 rounded-full'
                 />  
                   
                  <h1>{data?.address?.wallet?.primaryProfile?.handle}</h1>
                  </div>
                   {isShowMenu &&  
                     <div className='absolute border  w-[150px] shadow-lg top-11 right-10 duration-300 py-2 px-3 z-10 bg-purple-100'>
                      <Link href="/profile">
                        <div className='flex items-center gap-2 mb-3 cursor-pointer'>
                          <HiOutlineUserCircle  size={20}  />
                            <p className='font-semibold'>Profile</p>
                        </div>
                        </Link>
                        <div className='flex items-center gap-2 mb-3 cursor-pointer'>
                             <AiFillSetting  size={20}  />
                            <p className='font-semibold'>Edit profile</p>
                        </div>

                        <div className='flex items-center gap-2 mb-3 cursor-pointer'>
                            <AiOutlineLogout  size={20} />
                            <p className='font-semibold'>Log out</p>
                        </div>
                      
                      </div>
                   }
             </div>
            )
          }else if(accessTokensValue && ! isConnected){
           return(
            <div>
             <ConnectButton   />
             </div>
           )
          }else if(isConnected && ! accessTokensValue){
            return(
              <div>
               <button>Sin-in with cc</button>
               </div>
            )
          }else if(! accessTokensValue) {
            return(
              <div>no access token</div>
            )
          }
       }

       console.log("is conected", isConnected)
  return (
    <div className=' max-w-[1300px] mx-auto flex justify-between items-center px-3 py-4 sticky top-1 z-10 bg-purple-100'>
         <div className='flex gap-10 items-center'>
             <img   src='/img/logo.png'  className='rounded-full w-10 h-10 ring-2 cursor-pointer'   />
              <div className='flex gap-7 '>
                {topNavOptions.map((item, i) =>  {

                    return(
                         <div key={i}>
                            <motion.p 
                              whileHover={{scale : 1.1}}
                            className='font-semibold  cursor-pointer'>{item.name}</motion.p>
                         </div>
                    )
                })}
              </div>
         </div>
         <div className='flex gap-4 '>
         <div>
           <ConnectButton showBalance={false} />
           {/* <button className='bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg' onClick={handleSignInWithCC}>Sin-in with cc</button>
           */}
              </div>
            {getCurrentAuthState()}
            
         </div>
    </div>
  )
}
