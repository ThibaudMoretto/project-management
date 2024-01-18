import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: headers => {
    headers.set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('accessToken')}`
    );
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return headers;
  },
  credentials: 'include',
  mode: 'cors',
});
