import { Request, Response } from 'express';

import { TLocales } from 'project-management-types';

import localesDatamapper from '../datamappers/localesDatamapper';

const projectsController = {
  getLocales: async (_: Request, response: Response<TLocales[]>) => {
    const locales = await localesDatamapper.getAll();

    response.json(locales);
  },
};

export default projectsController;
