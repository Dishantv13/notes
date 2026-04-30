import { Search, Plus, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch, onClear, onAddNote }) => {
  return (
    <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search notes..."
          className="w-full rounded-lg bg-white border border-slate-200 py-3 pl-10 pr-10 text-slate-900 outline-none focus:border-indigo-500 shadow-sm transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onSearch}
        />
        {searchQuery && (
          <button 
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <button 
        onClick={onAddNote}
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
      >
        <Plus size={20} />
        New Note
      </button>
    </div>
  );
};

export default SearchBar;
