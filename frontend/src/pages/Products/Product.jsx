/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[25rem] object-contain rounded transition-all duration-300 ease-in-out transform hover:scale-105"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:space-x-4">
            <div className="text-lg text-gray-200 mb-2 sm:mb-0">
              {product.name}
            </div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-1 rounded-full dark:bg-pink-900 w-20 text-center dark:text-pink-300">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
