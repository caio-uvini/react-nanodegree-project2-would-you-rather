import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as SharedActions from '../actions/shared'

import LoginPage from './LoginPage'

class App extends Component {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <LoginPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(SharedActions.handleInitialData())
})


const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;
