This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), consuming GraphQL endpoint from [PokeAPI](https://github.com/PokeAPI/pokeapi).

## Prerequisites

### GraphQL server
Make sure you have the PokeAPI GraphQL running on your [http://localhost:8080/v1/graphql](http://localhost:8080/v1/graphql)

Otherwise, you can change GraphQL URI in [docker-compose.yaml](./docker-compose.yaml)
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
The build step will take a while, since it needs to pull pokemon images from [https://github.com/PokeAPI/sprites](https://github.com/PokeAPI/sprites)