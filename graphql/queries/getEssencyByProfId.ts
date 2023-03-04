import {gql} from '@apollo/client'

 export const  GET_ESSENCE_BY_PROFILE_ID = gql`
 query ProfileByID($profileId: ProfileID!, $essenceId: EssenceID!) {
    profileByID(profileID: $profileId) {
      essence(essenceID: $essenceId) {
        createdBy {
          avatar
          handle
        }
        name
        symbol
        metadata {
            metadata_id
          animation_url
          app_id
          content
          description
          external_url
          image
          issue_date
          media {
            media_url
            preview_image_url
            media_type
            alt_tag
          }
          name
          tags
          version
        }
      }
      avatar
    }
  }
 
 `