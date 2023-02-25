// @ts-nocheck
import { apolloClient } from '@/graphql/apollo/apolloClient'
import {gql} from '@apollo/client'


export const useAuthenticate = () =>  {
   const GET_MESSAGE = `
  mutation LoginGetMessage($input: LoginGetMessageInput!) {
    loginGetMessage(input: $input) {
      message
    }
  }
`;

const VERIFY_AUTH = `
  mutation LoginVerify($input: LoginVerifyInput!) {
    loginVerify(input: $input) {
      accessToken
    }
  }
`;

 const DOMAIN = "cybertube.com"

  const generateMessage = async  (address) => {
     const res = apolloClient.mutate({
        mutation : gql(GET_MESSAGE),
        variables : {
         input : {
          address:address,
          domain : DOMAIN
         }
        }
     })

     return (await res).data.loginGetMessage.message
    
  }

  const authenticate = async (address, signature) =>  {
   const res = apolloClient.mutate({
    mutation : gql(VERIFY_AUTH),
     variables : {
      input : {
        address : address,
        domain : DOMAIN,
        signature: signature,
      }
     }
   })

   return (await res).data.loginVerify?.accessToken
  }
  

  return {
    generateMessage,
    authenticate
  }
}