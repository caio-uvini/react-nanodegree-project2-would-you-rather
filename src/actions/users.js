const TYPES = {
  RECEIVE_USERS: 'RECEIVE_USERS'
};

function receiveUsers(users) {
  return {
    type: TYPES.RECEIVE_USERS,
    users: users
  };
}

export { TYPES, receiveUsers };