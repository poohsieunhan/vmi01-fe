// src/components/common/SearchInput.jsx
function SearchInput({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = "Tìm kiếm...",
  className = "",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute bg-red-100 inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Nếu muốn có nút tìm kiếm riêng */}
      <button
        type="submit"
        className="hidden md:inline-flex px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
      >
        Tìm
      </button>
    </form>
  );
}

export default SearchInput;
