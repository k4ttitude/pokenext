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

  return (
    <div className="flex flex-col gap-1 bg-yellow-300">
      <h2 className="font-bold text-2xl uppercase mb-4 self-center">
        Pokemon search results
      </h2>
      <div className="flex flex-col gap-1 p-2 rounded-lg bg-white/50 self-center">
        <div className="flex gap-1">
          <Content className="flex-1 flex justify-evenly">
            <div className="flex-[2] flex flex-col items-center">
              <span>{englishName?.name}</span>
              <span>
                {
                  pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames.find(
                    (item) => item.pokemon_v2_language.name === "ja"
                  )?.name
                }
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
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
      </div>
      <Section>
        <Title>Type</Title>
      </Section>
      <Section>
        <Title>Abilities</Title>
        <Content></Content>
      </Section>
      <Section>
        <Title>Height</Title>
      </Section>
      <Section>
        <Title>Weight</Title>
      </Section>
    </div>
  );
}

const Section = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-1 p-2 rounded-lg bg-white/50 self-center">
    {children}
  </div>
);

const Title = ({ children }: PropsWithChildren) => (
  <h3 className="font-bold">{children}</h3>
);

const Content = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={classNames("bg-white rounded px-2 py-1", className)}>
    {children}
  </div>
);
