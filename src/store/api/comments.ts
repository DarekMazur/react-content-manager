import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommentTypes } from '../../types/dataTypes';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<ICommentTypes[], void>({
      query: () => 'comments',
      providesTags: ['Comments'],
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Comments'],
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
  useUpdateCommentMutation,
  useRemoveCommentMutation,
  useRemoveCommentsMutation,
} = commentsApi;
