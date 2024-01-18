import { userApi } from './user';
import { combineReducers } from 'redux';

import { localesApi } from './locales';
import { projectsApi } from './projects';
import { tasksApi } from './tasks';

const rootReducer = combineReducers({
  [localesApi.reducerPath]: localesApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
