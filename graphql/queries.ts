import { gql, TypedDocumentNode } from "@apollo/client";

/** List pokemon */
export type Pokemon = {
  id: number;
  order: number;
  pokemon_v2_pokemonspecy: {
    is_mythical: boolean;
    is_legendary: boolean;
    pokemon_v2_pokemonspeciesnames: {
      name: string;
      genus: string;
    }[];
  };
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
};

export type PokemonsList = {
  Variables: {
    limit?: number;
    offset?: number;
    search: `%${string}%`;
    type: string;
    isLegendary: boolean;
    isMythical: boolean;
  };
  Response: {
    pokemon_v2_pokemon: Pokemon[];
    pokemon_v2_pokemon_aggregate: {
      aggregate: {
        count: number;
      };
    };
  };
};

export const POKEMONS_LIST: TypedDocumentNode<
  PokemonsList["Response"],
  PokemonsList["Variables"]
> = gql`
  query ListPokemon(
    $limit: Int
    $offset: Int
    $search: String!
    $type: String!
    $isLegendary: Boolean!
    $isMythical: Boolean!
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        name: { _ilike: $search }
        pokemon_v2_pokemonspecy: {
          is_legendary: { _eq: $isLegendary }
          is_mythical: { _eq: $isMythical }
        }
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
      }
    ) {
      id
      order
      pokemon_v2_pokemonspecy {
        is_mythical
        is_legendary
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

    pokemon_v2_pokemon_aggregate(
      where: {
        name: { _ilike: $search }
        pokemon_v2_pokemonspecy: {
          is_legendary: { _eq: $isLegendary }
          is_mythical: { _eq: $isMythical }
        }
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

/** Pokemon Details */
type PokemonDetails = {
  Variables: { id: number };
  Response: {
    pokemon_v2_pokemon_by_pk: {
      id: number;
      name: string;
      height: number;
      weight: number;
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          name: string;
        };
      }[];
      pokemon_v2_pokemonspecy: {
        pokemon_v2_pokemonspeciesnames: {
          name: string;
          genus: string;
          pokemon_v2_language: {
            name: string;
          };
        }[];
      };
      pokemon_v2_pokemonabilities: {
        pokemon_v2_ability: {
          pokemon_v2_abilitynames: {
            name: string;
          }[];
        };
      }[];
    };
  };
};
export const POKEMON_DETAILS: TypedDocumentNode<
  PokemonDetails["Response"],
  PokemonDetails["Variables"]
> = gql`
  query PokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(
          where: { pokemon_v2_language: { name: { _in: ["en", "ja"] } } }
        ) {
          name
          genus
          pokemon_v2_language {
            name
          }
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          pokemon_v2_abilitynames(
            where: { pokemon_v2_language: { name: { _eq: "en" } } }
          ) {
            name
          }
        }
      }
    }
  }
`;
