import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-around gap-4">
        {/* For larger screens */}
        <div className="hidden xl:block lg:hidden md:hidden">
          <div className="grid grid-cols-2 gap-4 py-10">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Product carousel visible on all screen sizes */}
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
