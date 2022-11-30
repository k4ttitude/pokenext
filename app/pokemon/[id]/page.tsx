import classNames from "classnames";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { client } from "../../../graphql/client";
import { POKEMON_DETAILS } from "../../../graphql/queries";
import { formatId } from "../../components/SearchResult/ListItem";

const getPokemon = async (id: number) => {
  const res = await client.query({ query: POKEMON_DETAILS, variables: { id } });
  return res.data.pokemon_v2_pokemon_by_pk;
};

type Props = { params: { id: number } };

export default async function Page({ params }: Props) {
  const pokemon = await getPokemon(params.id);
  const englishName =
    pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames.find(
      (item) => item.pokemon_v2_language.name === "en"
    );
  const type = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  return (
    <main
      className={`flex flex-col items-center min-h-screen bg-pokemon-${type}`}
    >
      <h2 className="font-bold text-2xl uppercase mb-4">
        Pokemon search results
      </h2>
      <div className="max-w-lg w-full flex flex-col gap-1">
        <Section>
          <div className="flex gap-1">
            <Content className="flex-1 flex justify-evenly">
              <div className="flex-[2] flex flex-col items-center">
                <span className="font-bold text-lg">{englishName?.name}</span>
                <span className="font-bold">
                  {
                    pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames.find(
                      (item) => item.pokemon_v2_language.name === "ja"
                    )?.name
                  }
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center text-center text-sm">
                {englishName?.genus}
              </div>
            </Content>
            <Content className="aspect-square flex items-center justify-center font-bold text-lg">
              #{formatId(pokemon.id, 3)}
            </Content>
          </div>
          <Content>
            <Image
              src="/sprites/sprites/pokemon/1.png"
              alt="Pikachu"
              className="w-full"
              width={200}
              height={200}
            />
          </Content>
        </Section>
        <Section>
          <Title>Types</Title>
          <Content className="flex gap-1 flex-wrap justify-center">
            {pokemon.pokemon_v2_pokemontypes
              .map((item) => item.pokemon_v2_type.name)
              .map((type, idx) => (
                <span
                  key={`type_${idx}`}
                  className={`rounded px-2 py-1 capitalize leading-none bg-pokemon-${type}`}
                >
                  {type}
                </span>
              ))}
          </Content>
        </Section>
        <Section>
          <Title>Abilities</Title>
          <Content className="grid grid-cols-2">
            {pokemon.pokemon_v2_pokemonabilities
              .map(
                (item) =>
                  item.pokemon_v2_ability.pokemon_v2_abilitynames[0].name
              )
              .map((ability) => (
                <span key={`ability_${ability}`} className="text-center">
                  {ability}
                </span>
              ))}
          </Content>
        </Section>
        <div className="grid grid-cols-2 gap-1">
          <Section>
            <Title>Height</Title>
            <Content>{pokemon.height / 10} m</Content>
          </Section>
          <Section>
            <Title>Weight</Title>
            <Content>{pokemon.weight / 10} kg</Content>
          </Section>
        </div>
      </div>
    </main>
  );
}

const Section = ({ children }: PropsWithChildren) => (
  <div className="w-full flex flex-col gap-1 p-2 rounded-lg bg-white/50 self-center">
    {children}
  </div>
);

const Title = ({ children }: PropsWithChildren) => (
  <h3 className="font-bold text-center">{children}</h3>
);

const Content = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={classNames("bg-white rounded px-2 py-1 text-center", className)}
  >
    {children}
  </div>
);
