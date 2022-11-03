import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';

const NavBar = () => (
  <div className="flex justify-between py-4 px-10 border-b">
    <div className="flex items-center gap-3">
      <Link to="/">
        <img src={logo} alt="logo" className="w-8" />
        <h1 className="text-red-500 font-bold">Tee-Rex</h1>
      </Link>
    </div>
    <Link to="/cart">
      <img src={cart} alt="cart" className="w-8" />
    </Link>
  </div>
);

export default NavBar;
