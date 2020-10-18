import { getInitialData } from '../utils/api'
import * as UsersActions from './users'
import * as QuestionsActions from './questions'

function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(([users, questions]) => {
        dispatch(UsersActions.receiveUsers(users))
        dispatch(QuestionsActions.receiveQuestions(questions))
      })
  }
}

export { handleInitialData }