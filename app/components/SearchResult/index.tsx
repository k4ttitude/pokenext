"use client";

import { useQuery } from "@apollo/client";
import { POKEMONS_LIST } from "../../../graphql/queries";
import useDebounce from "../../../hooks/useDebounce";
import { useSearchStore } from "../../../stores/search.store";
import ListItem from "./ListItem";

export default function SearchResult() {
  const { search, type, isLegendary, isMythical, offset, limit, setTotal } =
    useSearchStore();
  const debouncedSearch = useDebounce(search.value, 500);
  const { data } = useQuery(POKEMONS_LIST, {
    variables: {
      limit,
      offset,
      search: `%${debouncedSearch}%`,
      type: type.value,
      isLegendary: isLegendary.value,
      isMythical: isMythical.value,
    },
    onCompleted: (data) =>
      setTotal(data.pokemon_v2_pokemon_aggregate.aggregate.count),
  });

  return (
    <div className="flex-1 flex flex-col items-stretch gap-4 w-full my-4">
      {data?.pokemon_v2_pokemon.map((pokemon) => (
        <ListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
