import {gql} from '@apollo/client'

export const RELAY_ACTION_STATUS = gql`
query RelayActionStatus($relayActionId: ID!) {
  relayActionStatus(relayActionId: $relayActionId) {
    ... on RelayActionStatusResult {
      txHash
      txStatus

      returnData {
        ... on RegisterEssenceReturnData {
          essenceID
          essenceMw
          essenceTokenURI
          name
          prepareReturnData
          profileID
          symbol
        }
      }
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