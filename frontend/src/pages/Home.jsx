import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  //console.log(data);

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data || isError?.error}</Message>
      ) : (
        <>
          <div className="flex justify-between items-center gap-8 md:px-16 px-4">
            <h1 className="lg:ml-[20rem] ml-10 text-center text-gray-200 mt-[10rem] lg:text-[3rem] md:text-2xl text-xl font-semibold">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 lg:mr-[18rem] mt-[10rem] md:ml-0 text-gray-200"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[2rem] text-gray-200 md:px-20 md:gap-8 gap-4">
              {data?.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
