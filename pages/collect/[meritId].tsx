import TopNav from '@/components/TopNav'
import { fakeDescription, fakeHeading } from '@/constants'
import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import { apolloClient } from '@/graphql/apollo/apolloClient'
import { useRouter } from 'next/router'
import { GET_ESSENCY_METADATA_ID } from '@/graphql/queries/getEssencyByMetadataId'
import { PRIMARY_PROFILE } from '@/graphql/queries/getPrimaryProfileByAddress'
import { useAccount } from 'wagmi'
import { useCollectMerit } from '@/hooks'
import { RELAY_ACTION_STATUS } from '@/graphql/queries/getRelayerActionStatus'

export default function meritId() {

    const  router  =  useRouter()
    const {collectMerit, meritRelayId} = useCollectMerit()
   const routerId  =  router.query.meritId
   const [status, setStatus] = useState('queued')
   const [isStatusSuccess, setisStatusSuccess] = useState(false)
   const [isStatusError, setisStatusError] = useState(false)
     const {address} = useAccount()
     const {data, loading, error} = useQuery(GET_ESSENCY_METADATA_ID, {
      variables : {
        "metadataId" : routerId
      }
     })
     //   GET_PRIMARY_PROFILE
   const  {data :userProfile, loading: isUserProfileLoading, error : isUserProfileError} =  useQuery(PRIMARY_PROFILE, {
    variables :  {
      address : address
    }
   })

      //GET_CURRENT_TX_STATUS
 const { loading : isTxLoading, error :isTxError, data :TxData, startPolling, stopPolling} = useQuery(RELAY_ACTION_STATUS, {
  variables: {
    relayActionId : meritRelayId,
  } ,
  pollInterval: 1000, // poll every second
 // skip : isStatusSuccess
});

useEffect(() => {
 
  if (data && data.relayActionStatus) {
    if (TxData.relayActionStatus.txStatus === 'SUCCESS') {

      setisStatusSuccess(true)
      stopPolling();
      const  essenceTokenURI = data?.relayActionStatus?.returnData?.essenceTokenURI
        
      alert('Post created successfully!');
       setStatus("success")
    } else if (TxData.relayActionStatus.txStatus === 'ERROR') {
      setisStatusSuccess(true)
      stopPolling();
      alert(`Failed to create post: ${data.relayActionStatus.reason}`);
    }
  }
 

}, [TxData, stopPolling]);

console.log("tx status from collect", TxData)

          const theUserProfId  =  userProfile?.address?.wallet?.primaryProfile.profileID 
        const   firstEssencyInfo  = data?.essenceByFilter[0]
        const theCurentMeritId = firstEssencyInfo?.essenceID
        const creatorProfileId = firstEssencyInfo?.createdBy.profileID   

       console.log("the output  of meritId", creatorProfileId)

         const getEssencyCover = () => {
            if(firstEssencyInfo?.metadata?.media[0]?.media_type   === "image/png" ){
              return(
                <div className='max-w-[400px] h-[400px] '>
                <img    src={firstEssencyInfo.metadata?.media[0].media_url}  className='w-[100%] h-[100%] rounded-xl'    />
                </div>
              )
            }else if(firstEssencyInfo?.metadata?.media[0]?.media_type   === "image/jpg"){
              return(
                <img    src={firstEssencyInfo.metadata?.media[0].media_url}     />
              )
            }else if(! firstEssencyInfo?.metadata?.media?.media_url ){
              return(
                <div className='max-w-[400px] h-[400px] '>
                <img  src='/img/user-avatar.png' className='w-[100%] h-[100%] rounded-xl'  />
            </div> 
              )
            }
         }


  return (
    <div>
  <TopNav   />
    <div className='bg-purple-100 min-h-[80vh] flex items-center justify-center'>

    <div className='max-w-[1200px] mx-auto border border-purple-300 rounded-lg py-4 px-4 '>
        <div className='flex gap-12  sm:flex-col lg:flex-row items-center justify-center'>
            {/*<div className='max-w-[400px] h-[400px] '>
                <img  src='/img/user-avatar.png' className='w-[100%] h-[100%] rounded-xl'  />
  </div>*/}

     {getEssencyCover()}

              <div className=' lg:max-h-[440px] overflow-y-scroll w-[450px] min-h-[400px] rounded-lg py-3 px-3'>
                <h1 className='font-semibold text-3xl mb-4 capitalize'>{firstEssencyInfo?.name}</h1>
             

                 <h3 className='font-semibold text-lg text-black/75 mb-2'>Description</h3>
                  <p className='text-md text-black/60 mb-2'>{firstEssencyInfo?.metadata?.description}</p>

                  <h3 className='font-semibold text-lg text-black/75 mb-2'>Organization</h3>
                  <p className='text-md text-black/60 mb-2'>{firstEssencyInfo?.createdBy?.handle}</p>
                  <h3 className='font-semibold text-lg text-black/75 mb-2'>Dates</h3>
                  <p className='text-md text-black/60 mb-2'>2020/12/70</p>
                  <h3 className='font-semibold text-lg text-black/75 mb-2'>Link</h3>
                  <p className='text-md text-black/60 mb-2'>{firstEssencyInfo?.metadata?.external_url}</p>
                  

                   <button className='bg-purple-500 text-white font-semibold py-2 px-4 w-[100%] mx-auto rounded-lg hover:bg-purple-400' onClick={() => collectMerit(creatorProfileId, theCurentMeritId)}>collect</button>
              </div>
        </div>
    </div>
    </div>
    </div>
  )
}

  
