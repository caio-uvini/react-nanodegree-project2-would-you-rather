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

class App extends Component {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          
          <Route path='/' exact>
          {
            this.props.authedUser ? <Dashboard /> : <LoginPage />
          }
          </Route>
          
          <Route path='/questions/:id' component={QuestionPage} />
          
          <Route path='/add' component={NewQuestion} />
          
          <Route path='/leaderboard' component={Leaderboard} />
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
