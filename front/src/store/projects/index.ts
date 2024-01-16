import { createApi } from '@reduxjs/toolkit/query/react';

import { Project } from 'project-management-types';

import { baseQuery } from '../baseQuery';

export const projectsApi = createApi({
  baseQuery,
  tagTypes: ['Project'],
  endpoints: builder => ({
    getProjects: builder.query<Project[], void>({
      query: () => ({
        method: 'GET',
        url: 'projects',
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<Project, { title: Pick<Project, 'title'> }>(
      {
        query: ({ title }) => ({
          body: { title },
          method: 'POST',
          url: 'projects',
        }),
        invalidatesTags: ['Project'],
      }
    ),
  }),
  reducerPath: 'projects',
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApi;
