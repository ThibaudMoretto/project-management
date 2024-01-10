import { NextFunction, Request, Response } from 'express';

import { jwtService } from '../services/jwt';
import jwt from 'jsonwebtoken';

import { ROUTES_WITHOUT_AUTHENTICATION } from '../constants/routes';

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
  if (
    process.env.NODE_ENV === 'test' ||
    ROUTES_WITHOUT_AUTHENTICATION.some(route => request.url.includes(route))
  ) {
    console.log('next', request.url);

    return next();
  }

  try {
    const authHeader = request.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1].replace('"', '').replace('"', '');

    const refreshToken = request.cookies['refreshToken'];

    if (!refreshToken) return response.status(401).json({ error: 'Unauthorized' });

    return jwt.verify(
      accessToken as string,
      process.env.ACCESS_TOKEN_SECRET as string,
      async (error: any, decoded: any) => {
        if (!!decoded) {
          return next();
        }

        if (!!error) {
          const newAccessToken: { error?: string; accessToken?: string } =
            await jwtService.getNewAccessToken(refreshToken);

          if (newAccessToken.error) {
            return response.status(401).json({ error: 'Unauthorized' });
          } else {
            response.locals.accessToken = newAccessToken.accessToken;
            next();
          }
        }
      }
    );
  } catch (error) {
    return response.status(500).json({ error });
  }
};
