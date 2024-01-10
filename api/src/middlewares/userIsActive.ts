import { NextFunction, Request, Response } from 'express';

import userDatamapper from '../datamappers/userDatamapper';

import { getEmailFromRequestAccessToken } from '../utils/token';

import { ROUTES_WITHOUT_AUTHENTICATION } from '../constants/routes';

export const userIsActive = async (request: Request, response: Response, next: NextFunction) => {
  if (
    process.env.NODE_ENV === 'test' ||
    ROUTES_WITHOUT_AUTHENTICATION.some(route => request.url.includes(route))
  ) {
    return next();
  }

  const email = getEmailFromRequestAccessToken(request, response);

  if (!email) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const { isActive } = await userDatamapper.getByEmail(email);

  if (!isActive) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  return next();
};
