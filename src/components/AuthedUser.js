import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as AuthedUserActions from '../actions/authedUser';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

const AuthedUser = ({ authedUser, signOut }) => {
  return (
    <div className='authed-user'>
      {
        authedUser
        ? (
            <div className='center'>
              <img
                className='avatar'
                src={authedUser.avatarURL}
                alt={`Avatar of ${authedUser.name}`}
              />
              <div>
                <span>Hi {authedUser.firstName}! </span>
                <Link to="/" className='active' onClick={() => signOut()}>Sign Out</Link>
              </div>
            </div>
          )
        : <Link to="/" className='active'>Sign In</Link>
      }
    </div>
  );
};

AuthedUser.propTypes = {
  authedUser: PropTypes.object,
  signOut: PropTypes.func.isRequired
};

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

const AuthedUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthedUser);

export default AuthedUserContainer;