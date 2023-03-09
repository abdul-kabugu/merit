import CreateMerit from '@/components/CreateMerit'
import TopNav from '@/components/TopNav'
import { GET_USER_PROFILE } from '@/graphql/queries/getProfile'
import { RELAY_ACTION_STATUS } from '@/graphql/queries/getRelayerActionStatus'
import { useCreateMerit } from '@/hooks'
import { useApolloClient, useQuery } from '@apollo/client'

import { useState, useEffect } from 'react'

export default function create() {
 /* const [status, setStatus] = useState("")
  const [isStatusSuccess, setisStatusSuccess] = useState(false)
  const {meritRelayId} = useCreateMerit()
  
  const { loading, error, data, startPolling, stopPolling} = useQuery(RELAY_ACTION_STATUS, {
    variables: {
      relayActionId : meritRelayId,
    } ,
    pollInterval: 1000, // poll every second
   // skip : isStatusSuccess
  });

     
  useEffect(() => {
 
    if (data && data.relayActionStatus) {
      if (data.relayActionStatus.txStatus === 'SUCCESS') {

        setisStatusSuccess(true)
        stopPolling();
        const  essenceTokenURI = data?.relayActionStatus?.returnData?.essenceTokenURI
        
        alert('Post created successfully!');
         setStatus("success")
      } else if (data.relayActionStatus.txStatus === 'ERROR') {
        setisStatusSuccess(true)
        stopPolling();
        alert(`Failed to create post: ${data.relayActionStatus.reason}`);
      }
    }
   
  
  }, [data, stopPolling]);

  console.log("tx status from create", data)*/
  return (
    <div className='bg-purple-100'>
         <TopNav  />
         
          <CreateMerit />
     
    </div>
  )
}
