import { client } from "../graphql/client";
import { PokemonsList } from "../graphql/queries";
import { POKEMONS_LIST } from "../graphql/queries";
import FormControl from "./components/FormControl";
import Pagination from "./components/Pagination";
import SearchResult from "./components/SearchResult";

const getData = async () => {
  const res = await client.query({
    query: POKEMONS_LIST,
  });
  return res;
};

export default async function Home() {
  // const { data, loading } = await getData();

  return (
    <main className="h-screen flex flex-col items-center">
      <div className="w-min px-3 py-2 flex flex-col min-w-[400px]">
        <h2 className="font-bold text-2xl uppercase self-center mb-4">
          Pokemon Search
        </h2>
        <FormControl label="Name" controlId="search">
          <input
            id="search"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
            required
          />
        </FormControl>

        <FormControl label="Type" controlId="type">
          <select
            id="type"
            className="pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Electric</option>
            <option>Normal</option>
          </select>
        </FormControl>
        <div className="grid grid-cols-2 mb-4">
          <Checkbox id="legendary" label="is legendary" />
          <Checkbox id="mythical" label="is mythical" />
        </div>
      </div>

      <Pagination />

      <SearchResult />
    </main>
  );
}

type CheckboxProps = { id: string; label: string };
const Checkbox = ({ id, label }: CheckboxProps) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      className="cursor-pointer bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
    />
    <label htmlFor={id} className="text-sm ml-3 cursor-pointer">
      {label}
    </label>
  </div>
);
