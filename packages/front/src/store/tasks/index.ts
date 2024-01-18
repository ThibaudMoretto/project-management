import { createApi } from '@reduxjs/toolkit/query/react';

import { TCreateTaskData, TTask } from 'project-management-types';

import { baseQuery } from '../baseQuery';

export const tasksApi = createApi({
  baseQuery,
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getTasks: builder.query<TTask[], string>({
      query: projectId => ({
        method: 'GET',
        url: `projects/${projectId}/tasks`,
      }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation<TTask, TCreateTaskData & { projectId: string }>({
      query: ({ projectId, ...createTaskData }) => ({
        body: createTaskData,
        method: 'POST',
        url: `projects/${projectId}/tasks`,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<TTask, TTask & { projectId: string }>({
      query: ({ projectId, ...task }) => ({
        body: task,
        method: 'PUT',
        url: `projects/${projectId}/tasks/${task.id}`,
      }),
      async onQueryStarted({ id, ...task }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', task.projectId, draft => {
            const taskIndex = draft.findIndex(task => task.id === id);

            if (taskIndex !== -1) {
              draft[taskIndex] = { ...draft[taskIndex], ...task };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Tasks'],
    }),
  }),
  reducerPath: 'tasks',
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
