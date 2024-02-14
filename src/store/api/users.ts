import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserTypes } from '../../types/dataTypes';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUserTypes[], void>({
      query: () => ({
        url: 'users',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `users/${body.uuid}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
    removeUsers: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
  useRemoveUsersMutation,
} = usersApi;
