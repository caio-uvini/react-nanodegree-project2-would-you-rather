const rootState = (state) => state.questionsById;

function getAllIdsGroupedByAnswerStatusSorted(state, answers) {
  const questionsState = rootState(state);

  const answeredQuestionsIds = Object.keys(answers)
    .sort((a, b) => questionsState[b].timestamp - questionsState[a].timestamp);

  const unansweredQuestionsIds = Object.keys(questionsState)
    .filter(questionId => !answeredQuestionsIds.includes(questionId))
    .sort((a, b) => questionsState[b].timestamp - questionsState[a].timestamp);

  return {
    answeredIds: answeredQuestionsIds,
    unansweredIds: unansweredQuestionsIds
  }
}

function getContentById(state, questionId) {
  const questionsState = rootState(state);
  const question = questionsState[questionId];

  return {
    id: questionId,
    author: question.author,
    creationTimestamp: question.timestamp,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text
  }
}

export { getAllIdsGroupedByAnswerStatusSorted, getContentById };