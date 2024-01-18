import { NextFunction, Request, Response } from 'express';

import Zod from 'zod';

const validate = (prop: string, schema: Zod.ZodSchema) => {
  return async (request: any, response: Response, next: NextFunction) => {
    try {
      await schema.safeParse(request[prop]);
      next();
    } catch (error: any) {
      return response.status(400).json({ error: error.errors || error });
    }
  };
};

export { validate };
