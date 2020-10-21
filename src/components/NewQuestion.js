import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as QuestionsActions from '../actions/questions';

import NavBar from './NavBar';

class NewQuestion extends Component {

  state = {
    optionOne: '',
    optionTwo: ''
  }

  onSubmit = (event) => {
    event.preventDefault();

    const {createQuestion, authedUser, history} = this.props;
    const {optionOne, optionTwo} = this.state;

    createQuestion(authedUser, optionOne, optionTwo);

    history.push('/');
  }

  onOptionChanged = (event, option) => {
    const text = event.target.value;
    this.setState((currentState) => ({
      ...currentState,
      [option]: text
    }))
  }

  render() {

    const {optionOne, optionTwo} = this.state;

    return (
      <div>
        <NavBar />
        <h1>New Question</h1>
        <form onSubmit={this.onSubmit}>
          <div>Would you rather...</div>
          <input 
            type="text" 
            value={optionOne} 
            onChange={(event) => this.onOptionChanged(event, "optionOne")} 
            placeholder="Fill in option one..." 
          />
          <div>...or...</div>
          <input 
            type="text" 
            value={optionTwo} 
            onChange={(event) => this.onOptionChanged(event, "optionTwo")} 
            placeholder="Fill in option two..." 
          />

          <input 
            type="submit" 
            value="Submit" 
            disabled={!optionOne || !optionTwo} 
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state)
})

const mapDispatchToProps = (dispatch) => ({
  createQuestion: (authedUser, optionOne, optionTwo) => dispatch(QuestionsActions.handleCreateQuestion(authedUser, optionOne, optionTwo))
})

const NewQuestionContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewQuestion)
);

export default NewQuestionContainer;