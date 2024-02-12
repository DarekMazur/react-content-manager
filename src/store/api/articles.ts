import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticleDataTypes } from '../../types/dataTypes';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticleDataTypes[], void>({
      query: () => 'articles',
      providesTags: ['Articles'],
    }),
    updateArticle: builder.mutation({
      query: (body) => ({
        url: `articles/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: `articles`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    removeArticle: builder.mutation({
      query: (id) => ({
        url: `articles/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Articles'],
    }),
    removeArticles: builder.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'DELETE',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useRemoveArticleMutation,
  useRemoveArticlesMutation,
} = articlesApi;
