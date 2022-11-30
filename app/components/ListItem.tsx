import Image from "next/image";
import { Pokemon } from "../../graphql/models";

type Props = { pokemon: Pokemon };
export default function ListItem({ pokemon }: Props) {
  return (
    <div className="bg-yellow-300 rounded px-3 py-2 flex items-center gap-3">
      <Image
        alt="avatar"
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
        width={100}
        height={100}
        className="bg-white border border-black"
      />
      <div className="bg-yellow-500 rounded mx-6 px-3 py-2 h-min flex flex-col">
        <h3 className="uppercase font-bold">#025 {pokemon.name}</h3>
        <span>{pokemon.pokemon_v2_pokemonspeciesnames[0].genus}</span>
      </div>
    </div>
  );
}
