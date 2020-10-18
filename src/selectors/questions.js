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

function getChosenOption(state, questionId, userId) {

  const questionsState = rootState(state);
  const question = questionsState[questionId];

  if (question.optionOne.votes.includes(userId)) {
    return "optionOne";
  }

  if (question.optionTwo.votes.includes(userId)) {
    return "optionTwo";
  }

  return null;
}

function calculatePercentage(count, total) {
  return (count / total) * 100;
}

function normalizePercentage(first, second) {

  if (first >= second) {
    return {
      first: Math.ceil(first),
      second: Math.floor(second)
    }
  }

  return {
    first: Math.floor(first),
    second: Math.ceil(second)
  }
}

function getVotesStats(state, questionId) {

  const questionsState = rootState(state);
  const question = questionsState[questionId];

  const optionOneVotesCount = question.optionOne.votes.length;
  const optionTwoVotesCount = question.optionTwo.votes.length;
  const totalVotesCount = optionOneVotesCount + optionTwoVotesCount;

  const optionOneVotesPercent = calculatePercentage(optionOneVotesCount, totalVotesCount);
  const optionTwoVotesPercent = calculatePercentage(optionTwoVotesCount, totalVotesCount);

  const normalized = normalizePercentage(optionOneVotesPercent, optionTwoVotesPercent);

  return {
    total: totalVotesCount,
    optionOne: {
      count: optionOneVotesCount,
      relative: normalized.first
    },
    optionTwo: {
      count: optionTwoVotesCount,
      relative: normalized.second
    }
  }
}

export { getAllIdsGroupedByAnswerStatusSorted, getContentById, getChosenOption, getVotesStats };