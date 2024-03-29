import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoriesDataTypes } from '../../types/categoryTypes.ts';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesDataTypes, void>({
      query: () => ({
        url: 'categories?populate=*&pagination[pageSize]=9999',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Categories'],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: (body) => ({
        url: `categories/${body.data.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    removeCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
} = categoriesApi;
