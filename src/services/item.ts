import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ToDoItem } from "../List";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/items" }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getAllItems: builder.query<ToDoItem[], void>({
      query: () => "/",
      providesTags: ["Items"],
    }),
    addListItem: builder.mutation<ToDoItem, { text: string }>({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Items"],
    }),
    changeDoneStatus: builder.mutation<ToDoItem, { id: string; done: boolean }>(
      {
        query: ({ id, done }) => ({
          url: `/${id}`,
          method: "PATCH",
          body: { done },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Items"],
      }
    ),
    deleteItem: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllItemsQuery,
  useAddListItemMutation,
  useChangeDoneStatusMutation,
  useDeleteItemMutation,
} = itemsApi;
