import { Request, Response } from 'express';

import { camelizeObjectKeys } from '../utils/camelizeObjectKeys';
import { getEmailFromRequestAccessToken } from '../utils/token';

import userDatamapper from '../datamappers/userDatamapper';

const userController = {
  getUser: async (request: Request, response: Response) => {
        const email = getEmailFromRequestAccessToken(request, response);

    console.log(email);

    const user = await userDatamapper.getByEmail(email);

    console.log(user);

    response.json(camelizeObjectKeys({ ...user }));
  },
};

export default userController;
