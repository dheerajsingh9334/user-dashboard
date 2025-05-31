import React from "react";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
   <div className="relative mb-6 w-full max-w-md mx-auto">
    <Search className="absolute top-3.5 left-3 text-gray-400 pointer-events-none h-5 w-5" />
    <input
      type="text"
      placeholder=" "
      className="peer pl-10 pr-4 h-12 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label="Search by name or city"
    />
    <label
      className="absolute left-10 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
    >
      Search by name or city
    </label>
  </div>
);

export default SearchBar;