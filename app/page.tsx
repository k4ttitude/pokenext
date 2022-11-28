export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center">
      <div className="bg-red-50 w-min px-3 py-2 flex flex-col">
        <h2>Pokemon Search</h2>
        <div>
          Name <input />
        </div>
        <div>
          Type{" "}
          <select>
            <option>Electric</option>
          </select>
        </div>
        <div>
          <input type="checkbox" />
          <label>is legendary</label>
          <input type="checkbox" />
          <label>is mythical</label>
        </div>
      </div>

      <div>Showing 1-3 results from 54</div>
      <div className="flex-1 flex flex-col items-stretch"></div>
    </main>
  );
}
