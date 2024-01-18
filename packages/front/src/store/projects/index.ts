import { createApi } from '@reduxjs/toolkit/query/react';

import { TProject } from 'project-management-types';

import { baseQuery } from '../baseQuery';

export const projectsApi = createApi({
  baseQuery,
  tagTypes: ['Project'],
  endpoints: builder => ({
    getProjects: builder.query<TProject[], void>({
      query: () => ({
        method: 'GET',
        url: 'projects',
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<
      TProject,
      { title: Pick<TProject, 'title'> }
    >({
      query: ({ title }) => ({
        body: { title },
        method: 'POST',
        url: 'projects',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
  reducerPath: 'projects',
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApi;
