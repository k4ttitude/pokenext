import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_GRAPHQL_URI, process.env.GRAPHQL_URI);

export const ssrClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: process.env.GRAPHQL_URI,
  }),
  cache: new InMemoryCache(),
});

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});
