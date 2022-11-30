import { gql, TypedDocumentNode } from "@apollo/client";

/** List pokemon */
export type Pokemon = {
  id: number;
  order: number;
  is_legendary: boolean;
  is_mythical: boolean;
  pokemon_v2_pokemonspeciesnames: {
    genus: string;
    name: string;
  }[];
};

export type PokemonsList = {
  Variables: { limit?: number; offset?: number };
  Response: {
    pokemon_v2_pokemonspecies: Pokemon[];
  };
};

export const POKEMONS_LIST: TypedDocumentNode<
  PokemonsList["Response"],
  PokemonsList["Variables"]
> = gql`
  query ListPokemon($limit: Int, $offset: Int) {
    pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      order_by: { order: asc }
    ) {
      id
      order
      is_legendary
      is_mythical
      pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
      ) {
        genus
        name
      }
    }
  }
`;

/** Count pokemon */
export type PokemonsCount = {
  pokemon_v2_pokemonspecies_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export const POKEMONS_COUNT: TypedDocumentNode<PokemonsCount> = gql`
  query CountPokemon {
    pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`;
