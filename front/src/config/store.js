import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { projectsApi } from 'store/projects';
import { tasksApi } from 'store/tasks';
import { userApi } from 'store/user';

import authenticationMiddleware from 'middlewares/authentication';

import reducer from 'store/reducers';

const configStore = () => {
  const middlewares = [
    thunk,
    authenticationMiddleware,
    projectsApi.middleware,
    tasksApi.middleware,
    userApi.middleware,
  ];

  return configureStore({
    reducer,
    middleware: gDM => gDM().concat(...middlewares),
  });
};
export default configStore;
