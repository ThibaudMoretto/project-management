/* eslint-disable function-paren-newline */
import { ActionFunction, NextFunction } from './types';

const authentication =
  () => (next: NextFunction) => (action: ActionFunction) => {
    const status = action.payload?.status;

    const noAuthenticationRoutes = ['/login'];

    if (
      status === 401 &&
      !noAuthenticationRoutes.some(route =>
        window.location.pathname.includes(route)
      )
    ) {
      window.location.href = '/login';
    }

    return next(action);
  };

export default authentication;
