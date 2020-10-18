import { saveQuestion, saveQuestionAnswer } from '../utils/api'

const TYPES = {
  RECEIVE_QUESTIONS: 'RECEIVE_QUESTIONS',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  CREATE_QUESTION: 'CREATE_QUESTION'
}

function receiveQuestions(questions) {
  return {
    type: TYPES.RECEIVE_QUESTIONS,
    questions: questions
  }
}

function handleAnswerQuestion(authedUser, questionId, answer) {
  return (dispatch) => {
    saveQuestionAnswer({
      authedUser,
      questionId,
      answer
    }).then(() => {
      dispatch(answerQuestion(authedUser, questionId, answer))
    })
  }
}

function handleCreateQuestion(authedUser, optionOne, optionTwo) {
  return (dispatch) => {
    saveQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo
    }).then((question) => {
      dispatch(createQuestion(question))
    })
  }
}


function answerQuestion(authedUser, questionId, answer) {
  return {
    type: TYPES.ANSWER_QUESTION,
    authedUser,
    questionId,
    answer
  }
}

function createQuestion(question) {
  return {
    type: TYPES.ANSWER_QUESTION,
    question
  }
}

export { TYPES, receiveQuestions, handleAnswerQuestion }