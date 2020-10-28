import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import authedUser from './authedUser';
import users from './users';
import questions from './questions';

const reducers = combineReducers({
  authedUser: authedUser,
  usersById: users,
  questionsById: questions,
  loadingBar: loadingBarReducer
});

export default reducers;