"use client";

import { useQuery } from "@apollo/client";
import { PokemonList } from "../../../graphql/models";
import { pokemonListQuery } from "../../../graphql/queries";
import ListItem from "../ListItem";

export default function SearchResult() {
  const { data } = useQuery<PokemonList["Response"], PokemonList["Variables"]>(
    pokemonListQuery,
    { variables: { limit: 1, offset: 0 } }
  );

  return (
    <div className="flex-1 flex flex-col items-stretch gap-4">
      {data?.pokemon_v2_pokemonspecies.map((pokemon) => (
        <ListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
