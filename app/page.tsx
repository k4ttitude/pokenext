import FormControl from "./components/FormControl";
import ListItem from "./components/ListItem";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center">
      <div className="w-min px-3 py-2 flex flex-col min-w-[400px]">
        <h2 className="font-bold uppercase self-center mb-4">Pokemon Search</h2>
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
        <div>
          <input type="checkbox" />
          <label>is legendary</label>
          <input type="checkbox" />
          <label>is mythical</label>
        </div>
      </div>

      <div>
        Showing 1-3 results from 54
        <button>first</button>
        <button>prev</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>next</button>
        <button>last</button>
      </div>

      <div className="flex-1 flex flex-col items-stretch gap-4">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <ListItem key={i} />
          ))}
      </div>
    </main>
  );
}
