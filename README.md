This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), consuming GraphQL endpoint from [PokeAPI](https://github.com/PokeAPI/pokeapi).

## Prerequisites

### GraphQL server
Make sure you have the [PokeAPI](https://github.com/PokeAPI/pokeapi) **graphql** running on your localhost.
```sh
# clone the repository
git clone --recurse-submodules git@github.com:PokeAPI/pokeapi.git
cd pokeapi

make docker-setup # require python3 and pip3

sudo npm install --global hasura-cli

make hasura-apply
```
At this point you should have Hasura Console at [http://localhost:8080/console](http://localhost:8080/console), and graphql endpoint at [http://localhost:8080/v1/graphql](http://localhost:8080/v1/graphql)

### Configure GraphQL URL
By default, you have:
```
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:8080/v1/graphql
GRAPHQL_URI=http://localhost:8080/v1/graphql
```
If your URI is different, you can change it in [docker-compose.yaml](./docker-compose.yaml)
```yaml
    # in build args
    build:
      context: .
      args:
        - NEXT_PUBLIC_GRAPHQL_URI=${YOUR_GRAPHQL_URI}
    # and in environemnt
    environment:
      - GRAPHQL_URI=${YOUR_GRAPHQL_URI}
```

## Run the Application

Simply run with docker:

```sh
docker-compose up -d
```