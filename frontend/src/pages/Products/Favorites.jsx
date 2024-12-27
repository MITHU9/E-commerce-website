import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-16 md:ml-16">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-bold pt-20 py-4 text-center sm:text-left mt-4 md:mt-2">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {favorites.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <Product key={product._id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
