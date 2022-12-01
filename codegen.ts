import { CodegenConfig } from "@graphql-codegen/cli";
require("dotenv").config();

console.log(process.env.GRAPHQL_URI);

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_URI,
  documents: ["graphql/**/*.{ts,tsx}"],
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
