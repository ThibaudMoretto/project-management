import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { localesApi } from 'store/locales';
import { projectsApi } from 'store/projects';
import { tasksApi } from 'store/tasks';
import { userApi } from 'store/user';

import authenticationMiddleware from 'middlewares/authentication';

import reducer from 'store/reducers';

const configStore = () => {
  const middlewares = [
    thunk,
    authenticationMiddleware,
    localesApi.middleware,
    projectsApi.middleware,
    tasksApi.middleware,
    userApi.middleware,
  ];

  return configureStore({
    reducer,
    // @ts-expect-error no need to type this
    middleware: gDM => gDM().concat(...middlewares),
  });
};

export type AppStore = ReturnType<typeof configStore>;
export type AppDispatch = AppStore['dispatch'];
export default configStore;
