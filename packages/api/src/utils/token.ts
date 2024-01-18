import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export function getEmailFromRequestAccessToken(
  request: Request,
  response: Response = {} as Response
) {
  const authHeader = request.headers['authorization'] as string;
  const accessTokenInHeader =
    authHeader && authHeader.split(' ')[1].replace('"', '').replace('"', '');

  const accessToken =
    accessTokenInHeader === 'null' ? response?.locals?.accessToken : accessTokenInHeader;

  if (!accessToken) {
    return '';
  }

  const { email } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as {
    email: string;
  };

  return email;
}
