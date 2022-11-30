export type Pokemon = {
  id: number;
  name: string;
  is_legendary: boolean;
  is_mythical: boolean;
  pokemon_v2_pokemonspeciesnames: {
    genus: string;
  }[];
};

export type PokemonList = {
  Variables: { limit?: number; offset?: number };
  Response: {
    pokemon_v2_pokemonspecies: Pokemon[];
  };
};
