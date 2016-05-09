import post from './post';
import user from './user';
import category from './category';
import appConfig from './app-config';
import auth from './auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  post,
  user,
  category,
  auth,
  appConfig
});

export default rootReducer;
