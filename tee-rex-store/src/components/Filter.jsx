const Filter = ({ filter }) => {
  console.log(filter);
  return (
    <div className="bg-white pr-20 pl-10 h-screen">
      {Object.keys(filter).map(title => (
        <div key={title}>
          <div className="text-xl font-bold">{title}</div>
          {Object.keys(filter[title]).map(filteritems => (
            <div key={filteritems}>
              <input type="checkbox" checked={filter[title].filteritems} />
              <span className="pl-4">{filteritems}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;
