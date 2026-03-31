import React from 'react';

const SearchField = ({ value, onChange, onSearch }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-outline">search</span>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline text-sm font-medium outline-none transition-all shadow-sm"
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
  );
};

export default SearchField;
