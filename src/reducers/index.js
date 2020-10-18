import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

const reducers = combineReducers({
  authedUser: authedUser,
  usersById: users,
  questionsById: questions
});

export default reducers;