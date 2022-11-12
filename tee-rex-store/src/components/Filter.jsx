const Filter = ({ filter, handleFilter, setFilter }) => {
  console.log(filter);
  return (
    <div className="bg-white pr-20 pl-10 h-screen">
      {Object.keys(filter).map(title => (
        <div key={title}>
          <div className="text-xl font-bold">{title}</div>
          {Object.keys(filter[title]).map(filteritems => {
            return (
              <div className="relative left-4" key={filteritems}>
                <input
                  onChange={() =>
                    setFilter(prevFilter => ({
                      ...prevFilter,
                      [title]: {
                        ...prevFilter[title],
                        [filteritems]: !prevFilter[title][filteritems],
                      },
                    }))
                  }
                  type="checkbox"
                  checked={filter[title][filteritems]}
                />
                <span className="pl-4">{filteritems}</span>
              </div>
            );
          })}
        </div>
      ))}
      <button
        onClick={handleFilter}
        type="button"
        className="bg-blue-700 text-white w-full px-2 py-1 mt-4 rounded-xl"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
