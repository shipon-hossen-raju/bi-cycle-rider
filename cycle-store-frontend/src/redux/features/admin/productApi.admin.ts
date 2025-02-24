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
    productUpdate: builder.mutation({
      query: (args) => ({
        url: `/admin/products/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
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
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["adminProduct"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useProductUpdateMutation,
  useDeleteProductsMutation,useGetSingleProductQuery
} = productApi;
