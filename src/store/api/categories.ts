import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoriesTypes } from '../../types/dataTypes';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesTypes, void>({
      query: () => 'categories',
      providesTags: ['Categories'],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: (body) => ({
        url: `categories/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    removeCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Categories'],
    }),
    removeCategories: builder.mutation({
      query: (body) => ({
        url: 'categories',
        method: 'DELETE',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
  useRemoveCategoriesMutation,
} = categoriesApi;
