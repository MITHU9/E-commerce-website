import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 hidden md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[40rem] md:w-[30rem] sm:w-[25rem] xs:w-full text-gray-200 py-12"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="flex flex-col items-center px-4">
                {/* Image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-contain h-[20rem] md:h-[25rem] xl:h-[30rem]"
                />

                {/* Product Details */}
                <div className="mt-4 flex flex-col md:flex-row justify-center gap-8 w-full ">
                  {/* Left Details */}
                  <div className="mb-4 md:mb-0 md:w-1/2">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-lg text-pink-500 font-semibold">
                      $ {price}
                    </p>
                    <p className="mt-4 text-sm text-gray-400">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  {/* Right Details */}
                  <div className="flex lg:flex-row md:w-1/2 md:flex-col text-sm gap-4">
                    <div>
                      <h1 className="flex items-center mb-2">
                        <FaStore className="mr-2 text-white" /> Brand:{" "}
                        <span className="ml-1">{brand}</span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        <span className="ml-1">
                          {moment(createdAt).fromNow()}
                        </span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2 text-white" /> Reviews:{" "}
                        <span className="ml-1">{numReviews}</span>
                      </h1>
                    </div>
                    <div>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        <span className="ml-1">{Math.round(rating)}</span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        <span className="ml-1">{quantity}</span>
                      </h1>
                      <h1 className="flex items-center">
                        <FaBox className="mr-2 text-white" /> In Stock:{" "}
                        <span className="ml-1">{countInStock}</span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
