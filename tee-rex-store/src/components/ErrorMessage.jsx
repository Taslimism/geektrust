import cancel from '../assets/cancel.png';
import useCartStore from '../store/cart.store';
import shallow from 'zustand/shallow';

const ErrorMessage = () => {
  const { stockOver, removeErrorPopup } = useCartStore(
    state => ({ stockOver: state.stockOver, removeErrorPopup: state.removeErrorPopup }),
    shallow,
  );
  return (
    <div className="fixed z-50 top-0 h-[100%] w-screen flex justify-center items-center overflow-y-hidden">
      <div
        onClick={e => e.stopPropagation()}
        className="flex z-50 flex-col justify-center items-center bg-white  px-20 py-32 overflow-hidden  rounded-md gap-3"
      >
        <img
          onClick={removeErrorPopup}
          className="h-10 w-10 cursor-pointer"
          src={cancel}
          alt="error sign"
        />

        <p>There has been an error</p>
        <p className="font-bold">We are out of stock for this item</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
