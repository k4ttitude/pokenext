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

  return (
    <div className="bg-yellow-300 hover:shadow-lg hover:ring hover:ring-yellow-500 rounded px-3 py-2 flex items-center gap-3 cursor-pointer">
      <Image
        alt="avatar"
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
        width={100}
        height={100}
        className="bg-white border border-black"
      />
      <div className="w-full bg-yellow-500 rounded mx-6 px-3 py-2 h-min flex flex-col">
        <h3 className="uppercase font-bold">
          #{formatOrder(pokemon.order, total.toString().length)} {pokemon.name}
        </h3>
        <span>{pokemon.pokemon_v2_pokemonspeciesnames[0].genus}</span>
      </div>
    </div>
  );
}
