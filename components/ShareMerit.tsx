// @ts-nocheck
import { GET_ESSENCE_BY_PROFILE_ID } from '@/graphql/queries/getEssencyByProfId'
import { useQuery } from '@apollo/client'
import React from 'react'
import {FacebookShareButton} from 'react-share'
import FacebookIcon from 'react-share/lib/FacebookIcon'
import RedditIcon from 'react-share/lib/RedditIcon'
import RedditShareButton from 'react-share/lib/RedditShareButton'
import TwitterIcon from 'react-share/lib/TwitterIcon'
import TwitterShareButton from 'react-share/lib/TwitterShareButton'
import WhatsappIcon from 'react-share/lib/WhatsappIcon'
import WhatsappShareButton from 'react-share/lib/WhatsappShareButton'
export default function ShareMerit({profileID, essenceID }) {
  
  const {data, loading, error} = useQuery(GET_ESSENCE_BY_PROFILE_ID, {
    variables : {
        "profileId": profileID || 228,
         "essenceId": essenceID || 24
    }
  })
  const shareUrl = `https://merit-x392.vercel.app/${data?.profileByID.essence.metadata?.metadata_id}`
    console.log("the data from share  essency  is here", data)

      const  getPreviewMedia = () =>  {
        if(data?.profileByID.essence.metadata.media[0].media_type === "image/png"          ){
           return(
             <div className='w-[350px] h-[300px] border py-2 px-2 border-gray-300 rounded-lg'>
               <img  src={data?.profileByID.essence.metadata.media[0].media_url}  className="w-[100%] h-[100%] object-cover rounded-lg" />
             </div>
           )
        }
      }
  return (
    <div className='h-screen bg-purple-100 flex items-center justify-center'>
       <div className='flex gap-4 items-center'>
        <div>
          <div>
               <h1 className='text-3xl font-semibold mb-2'>Share claim link</h1>
               <p className='font-semibold text-lg mb-4'>Share this link with allowlisted people so they can claim their Merit</p>
                 <div className='w-[400px] h-12 py-3 px-4 rounded-xl border border-blue-500 flex items-center justify-between'>
                  
                    <p className='truncate font-semibold '>{shareUrl}</p>
                  
                     <button className='py-1 px-2 rounded-lg cursor-pointer bg-purple-600 text-white font-semibold'>Copy</button>
                 </div>
          </div>

           <div>
             <div className='flex gap-4 mt-5'>
               <FacebookShareButton url={shareUrl}>
                  <FacebookIcon round  size={40}/>
               </FacebookShareButton>

                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon    round size={40}   />
                </TwitterShareButton>

                 <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon  round size={40}   />
                 </WhatsappShareButton>
                  <RedditShareButton url={shareUrl}>
                    <RedditIcon  round size={40} />
                  </RedditShareButton>
             </div>
           </div>
          </div>
          <div>
            {getPreviewMedia()}
          </div>
       </div>
       
    </div>
  )
}
