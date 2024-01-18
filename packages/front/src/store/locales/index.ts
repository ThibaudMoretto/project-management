import { createApi } from '@reduxjs/toolkit/query/react';

import { TLocales } from 'project-management-types';

import { baseQuery } from '../baseQuery';

export const localesApi = createApi({
  baseQuery,
  endpoints: builder => ({
    getLocales: builder.query<TLocales[], void>({
      query: () => ({
        method: 'GET',
        url: 'locales',
      }),
    }),
  }),
  reducerPath: 'locales',
});

export const { useGetLocalesQuery } = localesApi;
