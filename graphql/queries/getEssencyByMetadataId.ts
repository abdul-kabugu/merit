import {gql} from '@apollo/client'

export const GET_ESSENCY_METADATA_ID = gql `
query EssenceByFilter($metadataId: String) {
    essenceByFilter(metadataID: $metadataId) {
      collectedBy {
        totalCount
        pageInfo {
          startCursor
        }
      }
      contentID
      contractAddress
      createdBy {
        avatar
        followerCount
        handle
        id
        namespace {
          chainID
          contractAddress
          descriptorContract
          id
          name
        }
        profileID
      }
      essenceID
      id
      metadata {
        animation_url
        app_id
        content
        description
        external_url
        image
        image_data
        issue_date
        lang
        media {
          alt_tag
          media_type
          media_url
          preview_image_url
        }
        metadata_id
        name
        tags
        version
      }
      name
      symbol
      tokenURI
    }
  }

`