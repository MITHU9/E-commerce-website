import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div>
      <div className="pt-12 px-4 ml-12 mt-4 sm:px-8 lg:px-20 ">
        <Link to="/" className="text-white font-semibold hover:underline">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-8 px-4 sm:px-8 lg:px-20 py-8 text-gray-200 md:ml-12 relative ">
            {/* Left Section */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md lg:max-w-lg xl:max-w-2xl h-auto rounded-lg object-cover mx-auto lg:mx-0"
              />
              <div className="mt-4 flex justify-center lg:justify-start">
                <HeartIcon product={product} />
              </div>
            </div>

            {/* Right Section */}
            <div className="md:flex flex-col justify-between">
              {/* Product Name */}
              <h2 className="text-xl md:text-2xl font-semibold text-center lg:text-left">
                {product.name}
              </h2>

              {/* Product Description */}
              <p className="my-4 text-gray-400 text-sm sm:text-base lg:text-lg text-center lg:text-left">
                {product.description}
              </p>

              {/* Product Price */}
              <p className="text-4xl md:text-5xl my-4 font-extrabold text-center lg:text-left">
                ${product.price}
              </p>

              {/* Product Details */}
              <div className="flex flex-wrap md:gap-20 items-center lg:flex-nowrap">
                <div className="md:space-y-4 space-y-2">
                  <h1 className="flex items-center">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="md:space-y-4 space-y-2 mt-6 lg:mt-0 ml-2">
                  <h1 className="flex items-center">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              {/* Product Actions */}
              <div className="flex flex-wrap gap-8 md:gap-32 md:mt-4 mt-2 items-center">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 mt-4  md:mt-0 w-[6rem] rounded-lg text-gray-200 bg-gray-700"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6 lg:text-left">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 hover:bg-pink-500 text-white py-2 px-6 rounded-lg"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="md:mt-16 md:ml-12 px-4 sm:px-8 lg:px-20 text-gray-200 pb-8">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
