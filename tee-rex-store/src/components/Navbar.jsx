import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';
import useCartStore from '../store/cart.store';
import shallow from 'zustand/shallow';

const NavBar = () => {
  const totalItems = useCartStore(state => state.totalItems, shallow);
  return (
    <div className="flex justify-between py-4 px-10 border-b">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} alt="logo" className="w-8" />
          <h1 className="text-red-500 font-bold">Tee-Rex</h1>
        </Link>
      </div>
      <Link to="/cart">
        <div className="relative">
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-1 rounded-full px-1 text-xs text-white bg-black">
              {totalItems}
            </div>
          )}
          <img src={cart} alt="cart" className="w-8" />
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
