import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import * as SharedActions from '../actions/shared';
import * as AuthedUserSelectors from '../selectors/authedUser';

import LoginPage from './LoginPage'
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

import PrivateRoute from './PrivateRoute';

class App extends Component {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          
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
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(SharedActions.handleInitialData())
})


const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;
