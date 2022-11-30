"use client";

import { useQuery } from "@apollo/client";
import { POKEMONS_LIST } from "../../../graphql/queries";
import { usePaginationStore } from "../../../stores/pagination.store";
import ListItem from "./ListItem";

export default function SearchResult() {
  const { offset, limit } = usePaginationStore();
  const { data } = useQuery(POKEMONS_LIST, {
    variables: { limit, offset },
  });

  return (
    <div className="flex-1 flex flex-col items-stretch gap-4">
      {data?.pokemon_v2_pokemonspecies.map((pokemon) => (
        <ListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
