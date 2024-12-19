import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Category", "User", "Product", "Order"],
  endpoints: (builder) => ({
    // Category
    getCategoryList: builder.query({
      query: () => "/api/categories",
      providesTags: ["Category"],
    }),
    // User
    getUserList: builder.query({
      query: () => "/api/users",
      providesTags: ["User"],
    }),
    // Product
    getProductList: builder.query({
      query: () => "/api/products",
      providesTags: ["Product"],
    }),
    // Order
    getOrderList: builder.query({
      query: () => "/api/orders",
      providesTags: ["Order"],
    }),
  }),
});
