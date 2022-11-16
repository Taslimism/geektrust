import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import Card from './Card';
import search from '../assets/search.svg';
import filterimage from '../assets/filter.png';
import Filter from './Filter';
import useCartStore from '../store/cart.store';
import shallow from 'zustand/shallow';
import useClickOutside from '../utils/oustideClick';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);

  const filterRef = useRef();
  useClickOutside(filterRef, () => setShowFilter(false));

  const { addToCart } = useCartStore(state => ({ addToCart: state.addToCart }), shallow);

  useEffect(() => {
    (async () => {
      try {
        if (!searchTerm) {
          setSearchedProducts([]);
          const { data } = await axios.get(API_URL);

          setProducts(data);
          handleFilter(data, true);
        }
      } catch (e) {
        console.log('Unexpected error occured');
      }
    })();
  }, [searchTerm]);

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

  const handleSearch = searchTerm => {
    if (!searchTerm) return;
    const search = searchTerm.toLowerCase().trim().split(' ');

    const data = products.filter(product => {
      for (let i = 0; i < search.length; i++) {
        const term = search[i];
        const { color, type } = product;
        if (term.trim() === color.toLowerCase() || term.trim() === type.toLowerCase()) {
          return true;
        }
      }
      return false;
    });

    setSearchedProducts(data);
  };

  const handleFilter = (data, searchTermActive) => {
    const filters = [];
    !searchTermActive &&
      Object.values(data).forEach(items => {
        for (const [key, values] of Object.entries(items)) {
          if (values) {
            filters.push(key);
          }
        }
      });
    console.log(filters);

    if (searchTermActive) {
      const results = [];

      filters.forEach(filter => {
        data.forEach(product => {
          if (filter.includes(',')) {
            const [min, max] = key.split(',');
            if (product.price >= min && product.price <= max) {
              results.push(product);
            }
          } else if (
            product.gender === filter ||
            product.color === filter ||
            product.type === filter
          ) {
            results.push(product);
          }
        });
      });
      setSearchedProducts(results);
      return;
    }
    if (searchedProducts && searchedProducts.length > 0) {
      const results = filters.length > 0 ? [...searchedProducts] : [];
      filters.forEach(filter => {
        searchedProducts.forEach(product => {
          if (filter.includes(',')) {
            const [min, max] = key.split(',');
            if (product.price >= min && product.price <= max) {
              results.push(product);
            }
          } else if (
            product.gender === filter ||
            product.color === filter ||
            product.type === filter
          ) {
            results.push(product);
          }
        });
      });
      setSearchedProducts(results);
    } else {
      const results = filters.length > 0 ? [...searchedProducts] : [];
      filters.forEach(filter => {
        products.forEach(product => {
          if (filter.includes(',')) {
            const [min, max] = key.split(',');
            if (product.price >= min && product.price <= max) {
              results.push(product);
            }
          } else if (
            product.gender === filter ||
            product.color === filter ||
            product.type === filter
          ) {
            results.push(product);
          }
        });
      });
      setSearchedProducts(results);
    }
  };

  return (
    products.length > 0 && (
      <div className="p-10 relative max-w-screen overflow-hidden">
        <div
          ref={filterRef}
          className={`absolute top-4 right-0 z-10 translate-x-[100%] transition ${
            showFilter && 'translate-x-0'
          }  `}
        >
          <Filter filter={filter} setFilter={setFilter} handleFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-3 justify-between relative">
          <div className="font-bold text-lg">Products</div>
          <div className="border-slate-500 border relative p-1 flex items-center">
            <input
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
              type="text"
              className="w-[95%] p-1 focus:outline-none"
            />
            <button type="button" className="flex items-center">
              <img src={search} alt="search" className="w-5 absolute right-2" />
            </button>
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="border absolute right-0 flex items-center w-20 p-2 gap-2"
            type="button"
          >
            <span className="font-bold text-md">Filter</span>
            <img src={filterimage} alt="filter" className="w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-8 mt-5">
          {searchedProducts && searchedProducts.length > 0
            ? searchedProducts.map(product => (
                <div key={product.id}>
                  <Card {...product} addToCart={addToCart} />
                </div>
              ))
            : products.map(product => (
                <div key={product.id}>
                  <Card {...product} addToCart={addToCart} />
                </div>
              ))}
        </div>
      </div>
    )
  );
};

export default Products;
