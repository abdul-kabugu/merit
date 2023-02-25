import CreateMerit from '@/components/CreateMerit'
import TopNav from '@/components/TopNav'
import { GET_USER_PROFILE } from '@/graphql/queries/getProfile'
import { useApolloClient, useQuery } from '@apollo/client'

import React from 'react'

export default function create() {
  const {data, loading, error} = useQuery(GET_USER_PROFILE, {
    variables : {
      handle : "kabugu"
    }
  })

    console.log("the user profile ", data)
  return (
    <div>
         <TopNav  />
          <h1>create  meric page </h1>
          <CreateMerit />
    </div>
  )
}
