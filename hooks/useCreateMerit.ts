// @ts-nocheck
import { apolloClient } from '@/graphql/apollo/apolloClient';
import {gql} from '@apollo/client'
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

const RELAY_ACTION_STATUS = gql`
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
   const {address} = useAccount()
  const {signMessageAsync} = useSignMessage()
   const {uploadToIpfs} = usePinToIpfs()
      const  createMerit = async (description, imgCover, name) => {
        // user  profile id
         const  profileId  =  "197568503064"
        // upload  to  image  to  ipfs
       //  api  key
       const  apiKey = "70BgK11vuzXCMjFKhwzOWbGHHzEeTHBW"
          const imageUri  = await uploadToIpfs(imgCover)
        // Merit  metadata

        const metadata = {
          metadata_id: uuidv4(),
          version: "1.0.0",
          app_id: "meritone",
          lang: "en",
          issue_date: new Date().toISOString(),
          content: description,
          media: [],
          tags: [],
          image: `https://gateway.pinata.cloud/ipfs/${imageUri?.path}`,
         // image_data: !nftImageURL ? svg_data : "",
          name: name,
          description: description,
          animation_url: "",
          external_url: "",
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
         tokenURI: `https://gateway.pinata.cloud/ipfs/${ipfsResult?.path}`,
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

      const  signature =  await signMessageAsync({message : message})
      // call the  rely 

      const relyStatus =  await apolloClient.mutate({
        mutation : gql(RELAY),
        variables : {
          input : {
            typedDataID: typedDataID,
            signature: signature,
          }
         
        }
      })
      const txHash = relayResult.data?.relay?.relayTransaction?.txHash;
       console.log("the tx hash", txHash)
      }

      return {
        createMerit
      }
  }

