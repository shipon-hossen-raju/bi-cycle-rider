import { baseApi } from "../../baseApi/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/payments/order",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["payments"],
    }),
    //  getAllProducts: builder.query({
    //    query: (args) => {
    //      const params = new URLSearchParams();

    //      if (args) {
    //        args.forEach((item: TQueryParam) => {
    //          params.append(item.name, item.value as string);
    //        });
    //      }

    //      return {
    //        url: "/admin/products",
    //        method: "GET",
    //        params: params,
    //      };
    //    },
    //    providesTags: ["adminProduct"],
    //    transformResponse: (response: TResponseRedux<TProduct[]>) => {
    //      return {
    //        data: response.data,
    //        meta: response.meta,
    //      };
    //    },
    //  }),
    //  getSingleProduct: builder.query({
    //    query: (id) => ({
    //      url: `/admin/products/${id}`,
    //      method: "GET",
    //    }),
    //  }),
  }),
});

export const { useProductOrderMutation } = productApi;
