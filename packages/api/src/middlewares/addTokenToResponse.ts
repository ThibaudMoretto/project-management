import { Request, Response } from 'express';
import mung from 'express-mung';

const addTokenToResponse = (body: any, _: Request, response: Response) => {
  if (response.locals.accessToken) {
    body.accessToken = response.locals.accessToken;
  }

  return body;
};

export default mung.json(addTokenToResponse);
