import React from 'react';
import { connect } from 'react-redux';

import * as AuthedUserActions from '../actions/authedUser';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

const NavBar = (props) => {

  const {authedUser, signOut} = props;

  return (
    <div>
      <a href="/">Home</a>
      <a href="/">New Question</a>
      <a href="/">Leaderboard</a>
      { authedUser && (
        <div>
          Welcome back {authedUser.name}! 
          <a href="/" onClick={() => signOut()}>Sign Out</a>
        </div>
    )}
    </div>
  )
}

const mapStateToProps = (state) => {

  const authedUserId = AuthedUserSelectors.getCurrent(state);
  if (!authedUserId) {
    return {}
  }

  const authedUser = UsersSelectors.getUserForDisplay(state, authedUserId);

  return {
    authedUser: authedUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(AuthedUserActions.signOut())
})

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default NavBarContainer;