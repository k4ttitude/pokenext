import { TypedDocumentNode } from "@apollo/client";
import { gql } from "./__generated__";

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

export const POKEMONS_LIST = gql(`
  query ListPokemon(
    $limit: Int
    $offset: Int
    $where: pokemon_v2_pokemon_bool_exp
  ) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: $where) {
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
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        pokemon_v2_type {
          name
        }
      }
    }

    pokemon_v2_pokemon_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`);

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
        is_mythical: boolean;
        is_legendary: boolean;
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
export const POKEMON_DETAILS = gql(`
  query PokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        is_legendary
        is_mythical
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
`);

/** Autocomplete */
type PokemonAutocomplete = {
  Variables: { search: `%${string}%` };
  Response: { pokemon_v2_pokemonspecies: { name: string }[] };
};
export const POKEMON_AUTOCOMPLETE = gql(`
  query PokemonNames($search: String) {
    pokemon_v2_pokemonspecies(
      limit: 10
      order_by: { name: asc }
      where: { name: { _ilike: $search } }
    ) {
      name
    }
  }
`);
