import { TProduct, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../baseApi/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (userInfo) => ({
        url: "/admin/products",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["adminProduct"],
    }),
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/admin/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["adminProduct"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useAddProductMutation, useGetAllProductsQuery } = productApi;
