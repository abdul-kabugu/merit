import {ApolloClient,
    ApolloLink, 
    HttpLink, 
    InMemoryCache, 
    createHttpLink,
    gql} from '@apollo/client'
    import { setContext } from "@apollo/client/link/context";
    const API_URL = "https://api.cyberconnect.dev/testnet/"

    //const httpLink = new HttpLink({ uri: API_URL });
    const httpLink = createHttpLink({
       uri: "https://api.cyberconnect.dev/testnet/",
     });
 const authLink = setContext((_, { headers }) => {
       const token = localStorage.getItem("accessToken");
     
       return {
         headers: {
           ...headers,
           Authorization: token ? `bearer ${token}` : "",
         },
       };
     });
     
     export const apolloClient = new ApolloClient({
       link: authLink.concat(httpLink),
       cache: new InMemoryCache(),
     });