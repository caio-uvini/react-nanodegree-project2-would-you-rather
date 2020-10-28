import * as QuestionsActions from '../actions/questions';


function handleReceiveQuestions(state, action) {
  return {
    ...state,
    ...action.questions
  };
}

function handleAnswerQuestion(state, action) {

  const currentQuestion = state[action.questionId];
  const currentAnswer = currentQuestion[action.answer];

  return {
    ...state,
    [action.questionId]: {
      ...currentQuestion,
      [action.answer]: {
        ...currentAnswer,
        votes: currentAnswer.votes.concat(action.authedUser)
      }
    }
  };
}

function handleCreateQuestion(state, action) {
  return {
    ...state,
    [action.question.id]: action.question
  };
}

export default function questions(state = {}, action) {
  switch (action.type) {
    case QuestionsActions.TYPES.RECEIVE_QUESTIONS:
      return handleReceiveQuestions(state, action);
    case QuestionsActions.TYPES.ANSWER_QUESTION:
      return handleAnswerQuestion(state, action);
    case QuestionsActions.TYPES.CREATE_QUESTION:
      return handleCreateQuestion(state, action);
    default:
      return state;
  }
}