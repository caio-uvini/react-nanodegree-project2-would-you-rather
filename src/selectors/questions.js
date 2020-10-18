const rootState = (state) => state.questionsById;

function getAllIdsGroupedByAnswerStatus(state, answers) {
  const questionsState = rootState(state);

  const answeredQuestionsIds = Object.keys(answers);

  const unansweredQuestionsIds = Object.keys(questionsState)
    .filter(questionId => !answeredQuestionsIds.includes(questionId));

  return {
    answeredIds: answeredQuestionsIds,
    unansweredIds: unansweredQuestionsIds
  }
}

export { getAllIdsGroupedByAnswerStatus };