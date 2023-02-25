import {gql} from '@apollo/client'

export const GET_USER_PROFILE = gql`
query getProfileByHandle($handle: String!){
    profileByHandle(handle: $handle) {
      metadataInfo {
        avatar
        bio
        handle
      }
      owner {
        address
        id
        
      }
      isPrimary
    }
  }
`