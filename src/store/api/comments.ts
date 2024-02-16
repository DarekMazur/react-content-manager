import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommentsDataTypes } from '../../types/commentTypes.ts';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<ICommentsDataTypes, void>({
      query: () => ({
        url: 'comments?publicationState=preview&populate=*',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Comments'],
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
    removeComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Comments'],
    }),
    removeComments: builder.mutation({
      query: (body) => ({
        url: 'comments',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
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
