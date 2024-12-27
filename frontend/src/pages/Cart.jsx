import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex flex-wrap justify-around items-start mx-auto pt-8 text-gray-200">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty{" "}
            <Link to="/shop" className="text-pink-500">
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="md:flex md:flex-col w-full md:w-[80%] pt-16 px-4 py-4">
              <h1 className="text-2xl font-semibold mb-4 mt-4">
                Shopping Cart
              </h1>

              <div className="mt-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center mb-4 pb-2 border-b border-gray-500"
                  >
                    <div className="w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 ml-4">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-pink-500 text-sm md:text-lg"
                      >
                        {item.name}
                      </Link>

                      <div className="mt-2 text-white text-xs md:text-sm">
                        {item.brand}
                      </div>
                      <div className="mt-2 text-white font-bold text-lg">
                        $ {item.price}
                      </div>
                    </div>

                    <div className="w-24 md:w-32">
                      <select
                        className="w-full p-1 border rounded text-gray-200 bg-gray-700"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <button
                        className="text-red-500 mt-2 md:mt-0"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="ml-[1rem] mt-[.5rem]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 w-full md:w-[40rem] p-4 rounded-lg bg-gray-800">
                <h2 className="text-xl font-semibold mb-2">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <div className="text-2xl font-bold">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>

                <button
                  className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
