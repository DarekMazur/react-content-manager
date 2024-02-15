import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticleDataTypes } from '../../types/dataTypes';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticleDataTypes, void>({
      query: () => ({
        url: 'articles?publicationState=preview&populate=*&pagination[pageSize]=-1',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Articles'],
    }),
    updateArticle: builder.mutation({
      query: (body) => ({
        url: `articles/${body.id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: `articles`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    removeArticle: builder.mutation({
      query: (id) => ({
        url: `articles/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Articles'],
    }),
    removeArticles: builder.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
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
