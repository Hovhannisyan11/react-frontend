import { useState, useEffect, useRef } from "react";

function Search({ search, setSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      {!searchOpen && (
        <button className="search-icon" onClick={() => setSearchOpen(true)}>
          🔍
        </button>
      )}
      {searchOpen && (
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          className="search-input active"
        />
      )}
    </div>
  );
}

export default Search;
