import { userApi } from './user';
import { combineReducers } from 'redux';

import { projectsApi } from './projects';
import { tasksApi } from './tasks';

const rootReducer = combineReducers({
  [projectsApi.reducerPath]: projectsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
