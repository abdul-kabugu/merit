// @ts-nocheck
import { IPFS_GATEWAY, IPFS_GATEWAY_TWO } from '@/constants';
import { apolloClient } from '@/graphql/apollo/apolloClient';
import {gql} from '@apollo/client'
import { sign } from 'crypto';
import { ethers } from 'ethers';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import { useAccount, useSignMessage } from 'wagmi';
import { usePinToIpfs } from './usePinToIpfs';

const CREATE_REGISTER_MERIC_TYPED_DATA = `
  mutation CreateRegisterEssenceTypedData(
    $input: CreateRegisterEssenceTypedDataInput!
  ) {
    createRegisterEssenceTypedData(input: $input) {
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

  export const useCreateMerit = () =>  {
   const [isMeritUploading, setisMeritUploading] = useState(false)
   const {address} = useAccount()
  const {signMessageAsync} = useSignMessage()
   const {uploadToIpfs} = usePinToIpfs()

   const [meritRelayId, setmeritRelayId] = useState("")

      const  createMerit = async (description, imgCover, name, links, mediaType, profId) => {
        setisMeritUploading(true)
        try {
        // user  profile id
         const  profileId  =  profId
        // upload  to  image  to  ipfs
       //  api  key
       const  apiKey = "70BgK11vuzXCMjFKhwzOWbGHHzEeTHBW"
          const imageUri  = await uploadToIpfs(imgCover)
        // Merit  metadata
        //Eth  provide
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //Signer
        const signer = provider.getSigner();
     
          //  

        const metadata = {
          metadata_id: uuidv4(),
          version: "1.0.0",
          app_id: "meritone",
          lang: "en",
          issue_date: new Date().toISOString(),
          content: description,
          media: [{
            media_type : mediaType,
            media_url : `${IPFS_GATEWAY_TWO}${imageUri?.path}`,
          
           
          }],
          tags: [],
          image: `${IPFS_GATEWAY_TWO}${imageUri?.path}`,
         // image_data: !nftImageURL ? svg_data : "",
          name: name,
          description: description,
          animation_url: "",
          external_url: links,
          attributes: [],
        }

        const  ipfsResult = await uploadToIpfs(
          
          JSON.stringify(metadata)
         
        )
      console.log("post ipfs hash", ipfsResult?.path)


        //  create  typed  data 
    const  typedDataResult = await apolloClient.mutate({
      mutation : gql(CREATE_REGISTER_MERIC_TYPED_DATA),
      variables : {
        input : {
        profileID : profileId,
         name : name,
         symbol : "Merit",
         tokenURI: `${IPFS_GATEWAY_TWO}${ipfsResult?.path}`,
         middleware: {
          collectFree: true,
        },
        /* Set if the Essence should be transferable or not */
      transferable: false,
        }
      }
    })

    const typedData = typedDataResult.data?.createRegisterEssenceTypedData?.typedData;
    const message = typedData.data;
    const typedDataID = typedData.id;
      
    //const  signature =  await signMessageAsync({ message : sigParams})

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
       setisMeritUploading(false)  
      console.log("the tx  status", TxStatus)

      } catch (error) {
        setisMeritUploading(false)
        console.log("the error", error)
      }}

         

      return {
        createMerit, meritRelayId, isMeritUploading
      }
  }

