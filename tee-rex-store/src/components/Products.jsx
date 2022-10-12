import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(API_URL);
        setProducts(data);
      } catch (e) {
        console.log('Unexpected error occured');
      }
    })();
  }, []);

  return (
    products.length > 0 && (
      <div className="p-10">
        <div>
          <div>
            <input type="text" />
            <button type="button">Search</button>
          </div>
          <button type="button">Filter</button>
        </div>
        <div className="grid grid-cols-4 justify-between gap-8">
          {products.map(product => (
            <Card {...product} />
          ))}
        </div>
      </div>
    )
  );
};

export default Products;
