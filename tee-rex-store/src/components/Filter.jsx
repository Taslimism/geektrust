const Filter = ({ filter, handleFilter, setFilter }) => {
  return (
    <div className="bg-white pr-20 pl-10 h-screen">
      {Object.keys(filter).map(title => (
        <div key={title}>
          <div className="text-xl font-bold">{title}</div>
          {Object.keys(filter[title]).map(filteritems => {
            return (
              <div className="relative left-4" key={filteritems}>
                <input
                  onChange={() => {
                    setFilter(prevFilter => {
                      const newFilter = {
                        ...prevFilter,
                        [title]: {
                          ...prevFilter[title],
                          [filteritems]: !prevFilter[title][filteritems],
                        },
                      };
                      handleFilter(newFilter, false);
                      return newFilter;
                    });
                  }}
                  type="checkbox"
                  checked={filter[title][filteritems]}
                />
                <span className="pl-4">{filteritems}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Filter;
