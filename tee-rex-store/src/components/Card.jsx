const Card = ({ name, price, imageURL, addToCart, quantity, id }) => {
  return (
    <div className="border p-4">
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
        onClick={() => addToCart({ name, price, imageURL, id, quantity })}
        className="w-full text-center p-1 mt-2 bg-teal-900 border-none text-white"
        type="button"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
