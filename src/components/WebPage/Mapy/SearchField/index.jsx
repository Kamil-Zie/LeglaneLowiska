import React from 'react';

const SearchField = ({ value, onChange, onSearch }) => {
  return (
    <div className="relative w-full max-w-md mx-auto flex justify-between flex-row">
      <div className="inset-y-0 left-0 pl-1 flex items-center bg-surface-container rounded-xl w-full text-on-surface">
        <span className="material-symbols-outlined text-outline">search</span>
        <input
          type="text"
          className="block w-full  py-3 border-none bg-surface-container focus:ring-2 rounded-xl focus:ring-primary placeholder:text-outline text-sm font-medium outline-none transition-all shadow-sm"
          placeholder="Wpisz miasto lub łowisko..."
          value={value}
          onChange={(e) => {
            localStorage.setItem("searchQuery", e.target.value);
            if (onChange) onChange(e);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && onSearch) onSearch();
          }}
        />
      </div>
    </div>
  );
};

export default SearchField;
