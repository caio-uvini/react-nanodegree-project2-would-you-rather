const rootState = (state) => state.usersById;

function getUsersForDisplay(state) {
  const usersState = rootState(state);
  return Object.keys(usersState)
    .map((userId) => ({
    	id: userId,
    	name: usersState[userId].name,
    	avatarURL: usersState[userId].avatarURL
    }))
}

export { getUsersForDisplay }