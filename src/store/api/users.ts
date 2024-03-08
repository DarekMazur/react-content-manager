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
    getUser: builder.query<IStrapiUser, number>({
      query: (id) => ({
        url: `users/${id}?populate=*`,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Users'],
    }),
    getMe: builder.query<IStrapiUser, void>({
      query: () => ({
        url: 'users/me?populate=*',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          uuid: body.uuid,
          username: body.username,
          email: body.email,
          confirmed: body.confirmed,
          blocked: body.blocked,
          avatar: body.avatar,
          updatedAt: new Date(),
          role: {
            disconnect: [{ id: body.role.id }],
            connect: [{ id: body.newRole ? body.newRole.id : body.role.id }],
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
  }),
});

export const {
  useGetMeQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = usersApi;
