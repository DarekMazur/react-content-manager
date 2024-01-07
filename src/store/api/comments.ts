import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentTypes } from '../../types/dataTypes';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getComments: builder.query<CommentTypes[], void>({
      query: () => 'comments',
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;
