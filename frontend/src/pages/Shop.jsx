/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto py-8 md:pl-12 lg:pl-16  text-gray-200">
        {/* Button to toggle sidebar on mobile */}
        <div className="md:hidden mb-4 mt-16 p-2">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 ">
          {/* Sidebar */}
          <div
            className={`fixed md:static top-0 left-0 h-full w-3/4 md:w-1/4 bg-[#151515] p-4 z-50 transform transition-transform overflow-y-auto ${
              isSidebarOpen ? "translate-x-0 mt-20 pb-28" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-4">
              Filter by Categories
            </h2>
            <div className="p-4 ">
              {categories?.map((c) => (
                <div key={c._id} className="mb-4 text-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600"
                    />
                    <span className="ml-2 text-sm text-white">{c.name}</span>
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-4">
              Filter by Brands
            </h2>
            <div className="p-4">
              {uniqueBrands?.map((brand) => (
                <label key={brand} className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600"
                  />
                  <span className="ml-2 text-sm text-white">{brand}</span>
                </label>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-4">
              Filter by Price
            </h2>
            <div className="p-4">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <button
              className="w-full mt-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-500"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Products Section */}
          <div className="flex-1">
            <h2 className="h4 text-center font-semibold mb-4">
              {products?.length} Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 lg:col-span-2 xl:grid-cols-3 gap-6 px-2">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
