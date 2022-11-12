import shallow from 'zustand/shallow';
import useCartStore from '../store/cart.store';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';

const Card = ({ name, price, imageURL, addToCart, quantity, id }) => {
  const stockOver = useCartStore(state => state.stockOver, shallow);
  return (
    <div className="border p-4 overflow-hidden">
      <div className="w-full pb-3">
        <img className="h-44 mx-auto" src={imageURL} alt="Placeholder" />
      </div>
      <div className="border-t pt-2 flex justify-between">
        <p className="font-bold text-lg text-slate-500">{name}</p>
        <p className="font-lighter text-lg">
          Price - <span className="font-bold">${price}</span>
        </p>
      </div>
      <button
        onClick={() => addToCart({ id, quantity })}
        className="w-full text-center p-1 mt-2 bg-teal-900 border-none text-white"
        type="button"
      >
        Add to Cart
      </button>
      {stockOver && (
        <Modal>
          <ErrorMessage />
        </Modal>
      )}
    </div>
  );
};

export default Card;
