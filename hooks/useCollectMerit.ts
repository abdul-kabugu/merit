// @ts-nocheck
import { apolloClient } from '@/graphql/apollo/apolloClient'
import {gql} from '@apollo/client'
import {useState} from 'react'
import { ethers } from 'ethers';
import { useAccount, useSignMessage } from 'wagmi';


const  CREATE_COLLECT_MERIT_TYPED_DATA = `
  mutation CreateCollectEssenceTypedData(
    $input: CreateCollectEssenceTypedDataInput!
  ) {
    createCollectEssenceTypedData(input: $input) {
      typedData {
        id
        sender
        data
        nonce
      }
    }
  }
`;

export const RELAY = `
  mutation Relay($input: RelayInput!) {
    relay(input: $input) {
      relayActionId
    }
  }
`;

const RELAY_ACTION_STATUS = `
query RelayActionStatus($relayActionId: ID!) {
  relayActionStatus(relayActionId: $relayActionId) {
    ... on RelayActionStatusResult {
      txHash
      txStatus
    }
    ... on RelayActionError {
      reason
      lastKnownTxHash
    }
    ... on RelayActionQueued {
      queuedAt
    }
  }
}
`;


export const  useCollectMerit  = () =>  {
    const {address} = useAccount()
    const {signMessageAsync} = useSignMessage()
    const [meritRelayId, setmeritRelayId] = useState("")
      
    const collectMerit  =  async (profId, meritId) =>  {
         //Eth  provide
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //Signer
      const signer = provider.getSigner();
    const typedDataResult  =  await apolloClient.mutate({
        mutation : gql(CREATE_COLLECT_MERIT_TYPED_DATA),
        variables : {
            input  : {
                collector : address,
                profileID : profId,
                essenceID : meritId
            }
        }
    })

    const typedData =
    typedDataResult.data?.createCollectEssenceTypedData?.typedData;
  const message = typedData.data;
  const typedDataID = typedData.id;

    
   /* Get the signature for the message signed with the wallet */
const fromAddress = await signer.getAddress();
const params = [fromAddress, message];
const method = "eth_signTypedData_v4";
const signature = await signer.provider.send(method, params);

 // call the  rely 

 const relayResult =  await apolloClient.mutate({
    mutation : gql(RELAY),
    variables : {
      input : {
        typedDataID: typedDataID,
        signature: signature,
      }
     
    }
  })
 // const txHash = relayResult.data.relay.relayTransaction.txHash;
 const txHash = relayResult.data.relay;

    // get  relyer  status 

    const TxStatus = await apolloClient.query({
        query : gql(RELAY_ACTION_STATUS),
        variables : {
          relayActionId : txHash.relayActionId
        }
       })
 // SET_MERIT_RELAY_ID
 setmeritRelayId(txHash.relayActionId)
       
    console.log("the tx  status", TxStatus)
    }

      return {
        collectMerit, meritRelayId
      }
}