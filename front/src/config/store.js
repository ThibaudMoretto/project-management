import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { userApi } from 'store/user';

import authenticationMiddleware from 'middlewares/authentication';

import reducer from 'store/reducers';

const configStore = () => {
  const middlewares = [thunk, authenticationMiddleware, userApi.middleware];

  return configureStore({
    reducer,
    middleware: gDM => gDM().concat(...middlewares),
  });
};
export default configStore;
