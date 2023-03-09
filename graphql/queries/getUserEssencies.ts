import {gql} from '@apollo/client'

export const GET_USER_ESSENCIES = gql`

query ProfileByID($profileId: ProfileID!, $appId: String) {
    profileByID(profileID: $profileId) {
      avatar
      essences(appID: $appId) {
        totalCount
        edges {
          cursor
          node {
            essenceID
            id
            metadata {
              metadata_id
              version
              app_id
              lang
              issue_date
              content
              media {
                media_type
                media_url
                alt_tag
                preview_image_url
              }
              tags
              image
              image_data
              name
              description
              animation_url
              attributes {
                display_type
                trait_type
                value
              }
              external_url
            }
          }
        }
      }
    }
  }


`