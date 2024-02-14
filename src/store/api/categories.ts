import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoriesTypes } from '../../types/dataTypes';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesTypes[], void>({
      query: () => ({
        url: 'categories',
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
        url: `categories/${body.uuid}`,
        method: 'PATCH',
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
    removeCategories: builder.mutation({
      query: (body) => ({
        url: 'categories',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
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
  useRemoveCategoriesMutation,
} = categoriesApi;
