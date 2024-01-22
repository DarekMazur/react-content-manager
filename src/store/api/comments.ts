import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentTypes } from '../../types/dataTypes';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<CommentTypes[], void>({
      query: () => 'comments',
      providesTags: ['Comments'],
    }),
    removeComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Comments'],
    }),
    removeComments: builder.mutation({
      query: (body) => ({
        url: 'comments',
        method: 'DELETE',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useRemoveCommentMutation,
  useRemoveCommentsMutation,
} = commentsApi;
