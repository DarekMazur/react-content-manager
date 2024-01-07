import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleDataTypes } from '../../types/dataTypes';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleDataTypes[], void>({
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
  useUpdateArticleMutation,
  useRemoveArticleMutation,
  useRemoveArticlesMutation,
} = articlesApi;
