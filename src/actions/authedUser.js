const TYPES = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

function signIn(userId) {
  return {
    type: TYPES.SIGN_IN,
    userId: userId
  };
}

function signOut() {
  return {
    type: TYPES.SIGN_OUT
  };
}

export { TYPES, signIn, signOut };