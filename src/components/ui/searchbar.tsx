

function SearchBar() {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full px-4 py-2 shadow-md focus:outline-none border border-gray-300"
      />
    </div>
  )
}
