import { TProduct, TQueryParam, TResponseRedux, TUser } from "@/types";
import { baseApi } from "../../baseApi/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/users/",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["adminUsers"],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET'
      })
    })
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery
} = usersApi;
