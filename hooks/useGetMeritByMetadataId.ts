// @ts-nocheck
import { GET_ESSENCY_METADATA_ID } from '@/graphql/queries/getEssencyByMetadataId'
import {useQuery} from '@apollo/client'



export const useGetMeritByMetadataId = (metadataID) =>  {
    const {data, loading, error} = useQuery(GET_ESSENCY_METADATA_ID, {
        variables : {
            "metadataId" : metadataID
        }
    })

    return {
        data, loading, error
    }
}
