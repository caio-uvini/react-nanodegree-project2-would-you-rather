const rootState = (state) => state.usersById;

function getUsersForDisplay(state) {
  const usersState = rootState(state);
  return Object.keys(usersState)
    .map((userId) => formatForDisplay(usersState[userId]));
}

function getUserForDisplay(state, userId) {
  const usersState = rootState(state);
  return formatForDisplay(usersState[userId]);
}

function formatForDisplay(user) {

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    firstName: getFirstName(user.name),
    avatarURL: user.avatarURL
  }
}

function getAnswers(state, userId) {
  const usersState = rootState(state);
  return usersState[userId].answers;
}

function getLeaderboard(state) {
  const usersState = rootState(state);
  
  return Object.keys(usersState)
    .map(userId => usersState[userId])
    .map(user => {
      const questions = user.questions.length;
      const answers = Object.keys(user.answers).length
      return {
        user: {
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL
        },
        score: {
          questions: questions,
          answers: answers,
          total: questions + answers
        }
      }
    })
    .sort((a, b) => b.score.total - a.score.total)
}

function hasData(state) {
  return Object.keys(rootState(state)).length > 0;
}

function getFirstName(name) {
  return name.split(' ')[0];
}

export { hasData, getUserForDisplay, getUsersForDisplay, getAnswers, getLeaderboard }