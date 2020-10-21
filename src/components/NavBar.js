import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as AuthedUserActions from '../actions/authedUser';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

const NavBar = (props) => {

  const {authedUser, signOut} = props;

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/add">New Question</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      { authedUser && (
        <div>
          Welcome back {authedUser.name}! 
          <Link to="/" onClick={() => signOut()}>Sign Out</Link>
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