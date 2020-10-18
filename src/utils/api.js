import { 
	_getUsers, 
	_getQuestions, 
	_saveQuestion, 
	_saveQuestionAnswer 
} from './_DATA.js'


function getInitialData() {
  return Promise.all([
    _getUsers,
    _getQuestions
  ]).then(([users, questions]) => ({
    users,
    questions
  }))
}

const saveQuestion = _saveQuestion
const saveQuestionAnswer = _saveQuestionAnswer

export { getInitialData, saveQuestion, saveQuestionAnswer }