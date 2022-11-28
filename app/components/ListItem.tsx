import Image from "next/image";

export default function ListItem() {
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
        <h3 className="uppercase font-bold">#025 pikachu</h3>
        <span>Mouse Pokemon</span>
      </div>
    </div>
  );
}
