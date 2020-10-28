import { showLoading, hideLoading } from 'react-redux-loading';

import { getInitialData } from '../utils/api'
import * as UsersActions from './users'
import * as QuestionsActions from './questions'

function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(UsersActions.receiveUsers(users))
        dispatch(QuestionsActions.receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export { handleInitialData }