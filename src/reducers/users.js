import * as UsersActions from '../actions/users'
import * as QuestionsActions from '../actions/questions'

function handleReceiveUsers(state, action) {
  return {
    ...state,
    ...action.users
  }
}

function handleAnswerQuestion(state, action) {
  const user = state[action.authedUser]
  return {
    ...state,
    [user.id]: {
      ...user,
      answers: {
        ...user.answers,
        ...{ [action.questionId]: action.answer }
      }
    }
  }
}

function handleCreateQuestion(state, action) {
  const user = state[action.question.author]
  return {
    ...state,
    [user.id]: {
      ...user,
      questions: user.questions.concat(action.question.id)
    }
  }
}

export default function users(state = {}, action) {
  switch (action.type) {
    case UsersActions.TYPES.RECEIVE_USERS:
      return handleReceiveUsers(state, action);
    case QuestionsActions.TYPES.ANSWER_QUESTION:
      return handleAnswerQuestion(state, action);
    case QuestionsActions.TYPES.CREATE_QUESTION:
      return handleCreateQuestion(state, action);
    default:
      return state;
  }
}