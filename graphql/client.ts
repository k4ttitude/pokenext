import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const ssrClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: process.env.GRAPHQL_URI,
    headers: {
      "x-hasura-admin-secret": "pokemon",
    },
  }),
  cache: new InMemoryCache(),
});

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "pokemon",
  },
});
