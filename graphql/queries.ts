"use client";

import { gql } from "@apollo/client";

export const pokemonListQuery = gql`
  query PokemonList {
    pokemon_v2_pokemonspecies(limit: 5, offset: 0) {
      id
      name
      is_legendary
      is_mythical
      pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
      ) {
        genus
      }
    }
  }
`;
