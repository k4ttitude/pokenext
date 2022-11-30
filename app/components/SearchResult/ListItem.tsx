import Image from "next/image";
import { Pokemon } from "../../../graphql/queries";
import { usePaginationStore } from "../../../stores/pagination.store";

const formatOrder = (order: number, size: number) => {
  const s = `000${order}`;
  return s.substring(s.length - size);
};

type Props = { pokemon: Pokemon };
export default function ListItem({ pokemon }: Props) {
  const { total } = usePaginationStore();
  const speciesname =
    pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0];
  const type = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  return (
    <div
      className={`bg-pokemon-${type}/80 hover:shadow-lg hover:ring hover:ring-pokemon-${type} rounded px-3 py-2 flex items-center gap-3 cursor-pointer`}
    >
      <Image
        alt="avatar"
        src={`/sprites/sprites/pokemon/${pokemon.id}.png`}
        width={100}
        height={100}
        className="bg-white border border-gray-900 rounded min-w-[100px]"
      />
      <div
        className={`w-full bg-pokemon-${type} rounded mx-6 px-3 py-2 h-min flex flex-col`}
      >
        <h3 className="uppercase font-bold">
          #{formatOrder(pokemon.order, total.toString().length)}{" "}
          {speciesname.name}
        </h3>
        <span>{speciesname.genus}</span>
      </div>
    </div>
  );
}
