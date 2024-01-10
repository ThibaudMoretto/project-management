import { userApi } from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
