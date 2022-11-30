"use client";

import { useSearchStore } from "../stores/search.store";
import FormControl from "./components/FormControl";
import Pagination from "./components/Pagination";
import SearchResult from "./components/SearchResult";

const TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

export default function Home() {
  const { search, type, isLegendary, isMythical } = useSearchStore();

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-2xl uppercase mb-4 self-center">
        Pokemon Search
      </h2>
      <FormControl label="Name" controlId="search">
        <input
          id="search"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
        />
      </FormControl>

      <FormControl label="Type" controlId="type">
        <select
          id="type"
          className="pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
          value={type.value}
          onChange={(e) => type.onChange(e.target.value)}
        >
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormControl>
      <div className="grid grid-cols-2 mb-4">
        <Checkbox id="legendary" label="is legendary" {...isLegendary} />
        <Checkbox id="mythical" label="is mythical" {...isMythical} />
      </div>

      <Pagination />
      <SearchResult />
      <Pagination />
    </div>
  );
}

type CheckboxProps = {
  id: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};
const Checkbox = ({ id, label, value, onChange }: CheckboxProps) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      className="cursor-pointer bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
    <label htmlFor={id} className="text-sm ml-3 cursor-pointer">
      {label}
    </label>
  </div>
);
