import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import * as AuthedUserActions from '../actions/authedUser';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

const NavBar = (props) => {

  const {authedUser, signOut} = props;

  return (
    <div className='nav'>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName={'active'}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName={'active'}>New Question</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName={'active'}>Leaderboard</NavLink>
        </li>
        { authedUser && (
            <li className='authed-user'>
              <div className='center'>
                <img className='avatar'
                  src={authedUser.avatarURL} 
                  alt={`Avatar of ${authedUser.name}`} 
                />
                <div>
                  <span>Hi {authedUser.firstName}! </span>
                  <Link to="/" className='active' onClick={() => signOut()}>Sign Out</Link>
                </div>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {

  const authedUserId = AuthedUserSelectors.getCurrent(state);
  if (!authedUserId) {
    return {};
  }

  const authedUser = UsersSelectors.getUserForDisplay(state, authedUserId);

  return {
    authedUser: authedUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(AuthedUserActions.signOut())
});

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;