import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "../../../graphql/queries";
import { useSearchStore } from "../../../stores/search.store";

const formatOrder = (order: number, size: number) => {
  const s = `000${order}`;
  return s.substring(s.length - size);
};

type Props = { pokemon: Pokemon };
export default function ListItem({ pokemon }: Props) {
  const { total } = useSearchStore();
  const speciesname =
    pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0];
  const type = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;
  const isLegendary = pokemon.pokemon_v2_pokemonspecy.is_legendary;
  const isMythical = pokemon.pokemon_v2_pokemonspecy.is_mythical;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="relative group">
        <div
          className={classNames({
            "absolute -inset-[1px] bg-gradient-to-r rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt":
              isLegendary || isMythical,
            "from-yellow-600 to-red-600": isLegendary,
            "from-teal-600 to-blue-600": isMythical,
          })}
        ></div>
        <div
          className={classNames({
            [`relative bg-pokemon-${type} rounded px-3 py-2 flex items-center gap-3 cursor-pointer`]:
              true,
            [`hover:shadow-lg hover:ring hover:ring-pokemon-${type}`]:
              !isLegendary && !isMythical,
          })}
        >
          <Image
            alt="avatar"
            src={`/sprites/sprites/pokemon/${pokemon.id}.png`}
            width={100}
            height={100}
            className="bg-white border border-gray-900 rounded min-w-[100px]"
          />
          <div
            className={`relative bg-gray-300/80 mix-blend-multiply w-full rounded mx-6 px-3 py-2 h-min flex flex-col`}
          >
            <h3 className="uppercase font-bold">
              #{formatOrder(pokemon.order, total.toString().length)}{" "}
              {speciesname.name}
            </h3>
            <span>{speciesname.genus}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
