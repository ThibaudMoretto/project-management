import { createApi } from '@reduxjs/toolkit/query/react';

import { User } from 'project-management-types';

import { baseQuery } from '../baseQuery';

export const userApi = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => ({
        method: 'GET',
        url: 'user',
      }),
      providesTags: ['User'],
    }),
    login: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        body: { email, password },
        method: 'POST',
        url: 'login',
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'logout',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  reducerPath: 'user',
});

export const { useGetUserQuery, useLoginMutation, useLogoutMutation } = userApi;
