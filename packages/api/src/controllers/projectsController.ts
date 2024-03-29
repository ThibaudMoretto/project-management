import { Request, Response } from 'express';

import { TProject } from 'project-management-types';

import projectsDatamapper from '../datamappers/projectsDatamapper';

const projectsController = {
  getProject: async (request: Request, response: Response) => {
    const projectId = request.params.id as unknown as Pick<TProject, 'id'>;

    const project = await projectsDatamapper.getById(projectId);

    response.json({ ...project });
  },
  getAllProjects: async (_: Request, response: Response) => {
    const projects = await projectsDatamapper.getAll();

    response.json(projects);
  },
  createProject: async (request: Request, response: Response) => {
    const { title } = request.body as Pick<TProject, 'title'>;

    const project = await projectsDatamapper.create({ title });

    response.json({ ...project });
  },
};

export default projectsController;
