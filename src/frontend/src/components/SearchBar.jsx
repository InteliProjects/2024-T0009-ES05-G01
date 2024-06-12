export default function SearchBar() {
  return (
    <div className="w-[360px] flex items-center border border-gray-300 py-2 px-3">
      <button className="flex items-center justify-center pr-3 mr-2 border-r border-gray-300">
        <img src="/filter.svg" alt="Filter" className="h-5 w-5" />
      </button>
      <input
        type="text"
        placeholder="Pesquisar"
        className="appearance-none bg-transparent w-full font-sans text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button className="flex items-center justify-center pl-3 border-l border-gray-300">
        <img src="/search.svg" alt="Search" className="h-5 w-5" />
      </button>
    </div>
  );
}
