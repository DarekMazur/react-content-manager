import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserTypes } from '../../types/dataTypes';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserTypes[], void>({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
