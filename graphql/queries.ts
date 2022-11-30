import { gql, TypedDocumentNode } from "@apollo/client";

/** List pokemon */
export type Pokemon = {
  id: number;
  order: number;
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesnames: {
      genus: string;
      name: string;
    }[];
  };
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
};

export type PokemonsList = {
  Variables: { limit?: number; offset?: number };
  Response: {
    pokemon_v2_pokemon: Pokemon[];
  };
};

export const POKEMONS_LIST: TypedDocumentNode<
  PokemonsList["Response"],
  PokemonsList["Variables"]
> = gql`
  query ListPokemon($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      order
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          genus
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
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
