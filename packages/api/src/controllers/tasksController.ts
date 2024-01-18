import { Request, Response } from 'express';

import { camelizeObjectKeys } from '../utils/camelizeObjectKeys';

import { TProject } from 'project-management-types';

import tasksDatamapper from '../datamappers/tasksDatamapper';

const tasksController = {
  getAllByProjectId: async (request: Request, response: Response) => {
    const { id } = request.params as unknown as { id: Pick<TProject, 'id'> };

    const tasks = await tasksDatamapper.getAllByProjectId(id);

    response.json(tasks);
  },
  createTask: async (request: Request, response: Response) => {
    const { title, description, priority } = request.body;
    const projectId = request.params.id as unknown as Pick<TProject, 'id'>;

    const task = await tasksDatamapper.create({
      title,
      description,
      priority,
      projectId,
    });

    response.json(camelizeObjectKeys(task));
  },
  updateTask: async (request: Request, response: Response) => {
    const { id, title, description, priority, status } = request.body;
    const projectId = request.params.id as unknown as string;

    const task = await tasksDatamapper.update({
      id,
      title,
      description,
      priority,
      status,
      projectId,
    });

    response.json(camelizeObjectKeys(task));
  },
};

export default tasksController;
