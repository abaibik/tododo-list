import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ToDoItem } from "../List";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/items" }),
  endpoints: (builder) => ({
    getAllItems: builder.query<ToDoItem[], void>({
      query: () => "/",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllItemsQuery } = itemsApi;
