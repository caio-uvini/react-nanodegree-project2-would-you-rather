import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import PropTypes from 'prop-types';

import * as SharedActions from '../actions/shared';
import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';
import * as QuestionsSelectors from '../selectors/questions';

import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NavBar from './NavBar';
import NotFound from './NotFound';

import PrivateRoute from './PrivateRoute';

class App extends Component {

  static propTypes = {
    authedUser: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    loadInitialData: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <LoadingBar />
          {
            this.props.loading
            ? null
            : (
                <div className='container'>
                  <Switch>               
                    <Route path='/' exact>
                    {
                      this.props.authedUser ? <Dashboard /> : <LoginPage />
                    }
                    </Route>
                    
                    <PrivateRoute path='/questions/:id'>
                      <QuestionPage />
                    </PrivateRoute>
                    
                    <PrivateRoute path='/add'>
                      <NewQuestion />
                    </PrivateRoute>
                    
                    <PrivateRoute path='/leaderboard'>
                      <Leaderboard />
                    </PrivateRoute>

                    <Route>
                      <NotFound msg={"Ouch! This page doesn't exist!"} />
                    </Route>
                  </Switch>
                </div>
              )
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state),
  loading: !UsersSelectors.hasData(state) || !QuestionsSelectors.hasData(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(SharedActions.handleInitialData())
});


const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
