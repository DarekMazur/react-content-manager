import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStrapiUser } from '../../types/userTypes.ts';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IStrapiUser[], void>({
      query: () => ({
        url: 'users?publicationState=preview&populate=*&pagination[pageSize]=9999',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: {
          username: body.username,
          email: body.email,
          confirmed: body.confirmed,
          blocked: body.blocked,
          updatedAt: new Date(),
          role: {
            disconnect: [{ id: body.role.id }],
            connect: [{ id: body.newRole.id }],
          },
        },
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
