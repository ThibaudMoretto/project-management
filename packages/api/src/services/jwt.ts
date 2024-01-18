import { CookieOptions } from 'express';

import jwt from 'jsonwebtoken';

import jwtDatamapper from '../datamappers/jwt';

export const jwtService = {
  getAccessToken(email: string) {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '1y',
    });

    return accessToken;
  },

  getRefreshToken(email: string) {
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: '1y',
    });

    return refreshToken;
  },

  async getNewAccessToken(refreshToken: string) {
    const refreshTokenExists = await jwtDatamapper.get(refreshToken);

    if (!refreshTokenExists) {
      return { error: 'Unauthorized' };
    } else {
      return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (error: any, decoded: any) => {
          if (!!error) {
            jwtDatamapper.delete(refreshToken);
            return { error: 'Unauthorized' };
          } else {
            const accessToken = jwtService.getAccessToken(decoded.email);

            return { accessToken };
          }
        }
      ) as unknown as { error?: any; decoded?: { email: string } };
    }
  },

  async saveToken(token: string) {
    try {
      await jwtDatamapper.add(token);
    } catch (error) {
      console.trace(error);

      const { code: errorCode } = error as any;

      //Si le token existe déjà en base (le code 23505 correspond à un doublon)
      if (errorCode === '23505') {
        return {
          data: [],
          error: `Token existant`,
        };
      }

      return {
        data: [],
        error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`,
      };
    }
  },

  async deleteToken(refreshToken: string) {
    try {
      return await jwtDatamapper.delete(refreshToken);
    } catch (error) {
      console.error(`Delete refresh token error : ` + error);
    }
  },

  cookieOptions: {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  } as CookieOptions,
};
