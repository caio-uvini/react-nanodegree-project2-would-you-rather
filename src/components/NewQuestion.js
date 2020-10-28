import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as QuestionsActions from '../actions/questions';

import NavBar from './NavBar';

class NewQuestion extends Component {

  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    createQuestion: PropTypes.func.isRequired
  }

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
        <div className='new-question'>
          <form className='new-question-form' onSubmit={this.onSubmit}>
              <div className='question-title'>Would you rather...</div>
              <div className='question-option-input'>
                <input 
                  type="text" 
                  value={optionOne} 
                  onChange={(event) => this.onOptionChanged(event, "optionOne")} 
                  placeholder="Fill in option one..." 
                />
              </div>
              <div className="strong">or...</div>
              <div className='question-option-input'>
                <input 
                  type="text" 
                  value={optionTwo} 
                  onChange={(event) => this.onOptionChanged(event, "optionTwo")} 
                  placeholder="Fill in option two..." 
                />
              </div>
  
            <div className='question-action-extra'>
              <button
                className='btn' 
                type="submit" 
                disabled={!optionOne || !optionTwo} 
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state)
});

const mapDispatchToProps = (dispatch) => ({
  createQuestion: (authedUser, optionOne, optionTwo) => dispatch(QuestionsActions.handleCreateQuestion(authedUser, optionOne, optionTwo))
});

const NewQuestionContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewQuestion)
);

export default NewQuestionContainer;