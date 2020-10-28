import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AuthedUserSelectors from '../selectors/authedUser';

const PrivateRoute = ({ children, authedUser, ...rest }) => {
  return (
    <Route 
      {...rest} 
      render={({ location }) => authedUser 
        ? (children) 
        : (<Redirect to={{ pathname: "/", state: { from: location }}} />) 
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state)
});

const mapDispatchToProps = (dispatch) => ({});

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);

export default PrivateRouteContainer;