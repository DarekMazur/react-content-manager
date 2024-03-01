import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICommentPopulatedData,
  ICommentsDataTypes,
} from '../../types/commentTypes.ts';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<ICommentsDataTypes, void>({
      query: () => ({
        url: 'comments?publicationState=preview&populate[0]=author&populate[1]=author.role&populate[2]=article&populate[3]=article.author',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Comments'],
    }),
    getComment: builder.query<ICommentPopulatedData, string>({
      query: (id) => ({
        url: `comments/${id}?populate[0]=author&populate[1]=author.role&populate[2]=article&populate[3]=article.author`,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Comments'],
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `comments/${body.data.id}`,
        method: 'PUT',
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
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentsApi;
