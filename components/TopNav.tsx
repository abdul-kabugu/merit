import { topNavOptions } from '@/constants'
import { useAuthenticate } from '@/hooks'
import { ConnectButton, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import {useState} from 'react'
import { useAccount, useChainId, useSignMessage } from 'wagmi'

export default function TopNav() {
    const {openConnectModal} = useConnectModal()
    const {generateMessage, authenticate} = useAuthenticate()
   const {signMessageAsync} = useSignMessage()
   const {address, isConnected } = useAccount()
   const chainId = useChainId();
     //  handle cc authentication

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
  return (
    <div className=' max-w-[1300px] mx-auto flex justify-between items-center px-3 py-4'>
         <div className='flex gap-10 items-center'>
             <h1 className='font-semibold text-4xl'>Merit</h1>
              <div className='flex gap-7 '>
                {topNavOptions.map((item, i) =>  {

                    return(
                         <div key={i}>
                            <p className='font-semibold text-lg cursor-pointer'>{item.name}</p>
                         </div>
                    )
                })}
              </div>
         </div>
         <div className='flex gap-4 '>
           <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false}  />
         
         {/*<button className='bg-black py-2 px-4 rounded-lg text-white' onClick={openConnectModal}>Connect Wallet</button>*/}
             <button className='bg-black py-2 px-4 rounded-lg text-white' onClick={handleSignInWithCC}>Sign-In with cc</button>
         </div>
    </div>
  )
}
