import * as AuthedUserActions from '../actions/authedUser';

function handleSignIn(state, action) {
  return action.userId;
}

function handleSignOut(state, action) {
  return null;
}

export default function authedUser(state = null, action) {
  switch (action.type) {
    case AuthedUserActions.TYPES.SIGN_IN:
      return handleSignIn(state, action);
    case AuthedUserActions.TYPES.SIGN_OUT:
      return handleSignOut(state, action);
    default:
      return state;
  }
}