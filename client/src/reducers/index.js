import { combineReducers } from 'redux';


import posts from './posts';
import auth from './auth';

export default combineReducers({ posts, auth });

// import { combineReducers } from 'redux';

// import posts from './posts';

// export const reducers = combineReducers({ posts });