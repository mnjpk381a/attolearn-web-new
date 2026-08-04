import React, { useId, useState, useEffect, useRef } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

interface SearchDropdownProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  initialValue?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  suggestions,
  onSelect,
  initialValue,
}) => {
  const [query, setQuery] = useState(initialValue || "");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        onSelect(query);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, onSelect]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const q = query.toLowerCase();
      if (!q) {
        setFiltered(suggestions); // show all if no query
      } else {
        setFiltered(suggestions.filter((s) => s.toLowerCase().includes(q)));
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query, suggestions]);

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowDropdown(false);
    onSelect(value);
  };

  const handleClear = () => {
    setQuery("");
    onSelect("");
    inputRef.current?.focus();
    setShowDropdown(true);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input container */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full border px-4 py-2 pr-20 h-10 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Select or search ..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true); // ✅ show while typing
          }}
          onFocus={() => {
            setShowDropdown(true); // ✅ always open on focus
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowDropdown(false); // optional clear
          }}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={showDropdown}
          role="combobox"
        />

        {/* Clear button (X) */}
        {query && (
          <button
            type="button"
            aria-label="Clear selection"
            className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
            onMouseDown={(e) => {
              e.preventDefault();
              handleClear();
            }}
          >
            <FiX className="text-gray-600" size={18} />
          </button>
        )}

        {/* Dropdown toggle button */}
        <button
          type="button"
          aria-label={showDropdown ? "Close suggestions" : "Open suggestions"}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowDropdown((v) => !v);
            inputRef.current?.focus();
          }}
        >
          <FiChevronDown
            className={`text-gray-600 transition-transform duration-200 ${
              showDropdown ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>
      </div>

      {/* Dropdown menu */}
      {showDropdown && filtered.length > 0 && (
        <ul
          id={listboxId}
          className="absolute z-10 bg-white border w-full mt-1 rounded shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          {filtered.map((item, idx) => (
            <li
              key={idx}
              role="option"
              aria-selected={query === item}
              onMouseDown={() => handleSelect(item)}
              className="px-4 py-2 text-left hover:bg-blue-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
