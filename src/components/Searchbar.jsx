import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
function Searchbar({ query, setQuery, handleClear, handleSearch }) {
  return (
    <div className="w-80 flex items-center justify-center bg-slate-50 relative">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border border-gray-300 w-full rounded-md focus:outline-none"
        value={query}
        // onKeyUp={handleSearch}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query ? (
        <IoIosClose
          className="absolute right-3 text-gray-400 cursor-pointer hover:text-gray-600"
          size={22}
          onClick={handleClear}
        />
      ) : (
        <CiSearch className="absolute right-3 text-gray-400" size={20} />
      )}
    </div>
  );
}

export default Searchbar;
