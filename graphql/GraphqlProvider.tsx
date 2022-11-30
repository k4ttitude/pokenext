"use client";

import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { client } from "./client";

export default function GraphqlProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
