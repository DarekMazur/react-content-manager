import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRoleTypes } from '../../types/roleTypes.ts';

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Roles'],
  endpoints: (builder) => ({
    getRoles: builder.query<IRoleTypes, void>({
      query: () => ({
        url: 'users-permissions/roles?pagination[pageSize]=9999',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ['Roles'],
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
