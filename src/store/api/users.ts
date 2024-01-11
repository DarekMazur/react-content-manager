import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserTypes } from '../../types/dataTypes';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserTypes[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
