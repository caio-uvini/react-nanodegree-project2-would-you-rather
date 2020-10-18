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
  return {
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL
  }
}

function getAnswers(state, userId) {
  const usersState = rootState(state);
  return usersState[userId].answers;
}

export { getUserForDisplay, getUsersForDisplay, getAnswers }