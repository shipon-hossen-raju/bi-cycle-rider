import { baseApi } from "../../baseApi/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (userInfo) => ({
        url: "/admin/products",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useAddProductMutation } = productApi;
