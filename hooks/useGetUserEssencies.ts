// @ts-nocheck

import { GET_USER_ESSENCIES } from '@/graphql/queries/getUserEssencies'
import {gql, useQuery}  from '@apollo/client'




export  const useGetUserEssencies = (profileId, appId) =>  {
    const {data :badges, loading : isBadgesLoading, error : isBadgesError} = useQuery(GET_USER_ESSENCIES, {
        variables : {
            "profileId": profileId,
        "appId": appId,
        }
    })

    return {
     badges,
        isBadgesLoading,
        isBadgesError
    }
}