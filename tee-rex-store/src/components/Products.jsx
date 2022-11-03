import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Card from './Card';
import search from '../assets/search.svg';
import filterimage from '../assets/filter.png';
import Filter from './Filter';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const filterData = {
  Gender: {
    Men: false,
    Women: false,
  },
  Color: {},
  'Price Range': {},
  Type: {},
};

const getAllColorAndType = products => {
  const color = {};
  const type = {};
  products.forEach(product => {
    color[product.color] = false;
    type[product.type] = false;
  });
  filterData.Color = color;
  filterData.Type = type;
};

const getPriceRange = products => {
  let max = 0;
  products.forEach(product => {
    if (max < product.price) {
      max = product.price;
    }
  });
  const priceRangeSteps = Math.ceil(max / 100);
  const priceRange = {};
  for (let i = 0; i < priceRangeSteps; i += 1) {
    const key = [];
    key.push(i * 100);
    key.push((i + 1) * 100);
    priceRange[key] = false;
  }
  filterData['Price Range'] = priceRange;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(filterData);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(API_URL);
        console.log(data);
        console.log(filterData);
        setProducts(data);
      } catch (e) {
        console.log('Unexpected error occured');
      }
    })();
  }, []);

  useMemo(() => {
    if (products) {
      getAllColorAndType(products);
    }
  }, [products]);

  useMemo(() => {
    if (products) {
      getPriceRange(products);
    }
  }, [products]);

  return (
    products.length > 0 && (
      <div className="p-10 max-w-screen">
        <div
          className={`absolute top-20 right-0 z-10 translate-x-[100%] transition ${
            showFilter && 'translate-x-0'
          }  `}
        >
          <Filter filter={filter} setFilter={setFilter} />
        </div>

        <div className="grid grid-cols-3 justify-between relative">
          <div className="font-bold text-lg">Products</div>
          <div className="border-slate-500 border relative p-1 flex items-center">
            <input type="text" className="w-[95%] p-1 focus:outline-none" />
            <button type="button" className="flex items-center">
              <img src={search} alt="search" className="w-5 absolute right-2" />
            </button>
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border absolute right-0 flex items-center w-20 p-2 gap-2"
            type="button"
          >
            <span className="font-bold text-md">Filter</span>
            <img src={filterimage} alt="filter" className="w-5" />
          </button>
        </div>
        <div className="grid grid-cols-4 justify-between gap-8 mt-5">
          {products.map(product => (
            <div key={product.id}>
              <Card {...product} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Products;
