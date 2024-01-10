import { Request, Response } from 'express';
import { jwtService } from '../services/jwt';
import userDatamapper from '../datamappers/userDatamapper';

import { User } from 'project-management';

const loginController = {
  async login(
    request: Request,
    response: Response<(User & { accessToken: string }) | { error: string }>
  ) {
    try {
      const { email } = request.body;
      const account = await userDatamapper.getByEmail(email);

      if (Object.entries(account).length === 0) {
        return response.status(404).json({
          error: 'account not found',
        });
      }

      const refreshToken = jwtService.getRefreshToken(account.email);
      const accessToken = jwtService.getAccessToken(account.email);

      await jwtService.saveToken(refreshToken);

      const { name, role, locale, isActive } = account;

      response.cookie('refreshToken', refreshToken, jwtService.cookieOptions).json({
        email,
        name,
        role,
        locale,
        isActive,
        accessToken,
      });
    } catch (error) {
      console.trace(error);

      response.status(400).json({
        error: 'login failed',
      });
    }
  },
};

export default loginController;
