import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as QuestionsSelectors from '../selectors/questions';
import * as QuestionsActions from '../actions/questions';

class QuestionCardUnansweredContent extends Component {

  state = {
    selectedOption : null
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const { authedUser, questionId } = this.props;
    const { selectedOption } = this.state;
    
    this.props.vote(authedUser, questionId, selectedOption);
  }

  onOptionSelected = (event) => {
    const option = event.target.value;
    this.setState(() => ({
      selectedOption: option
    }));
  }

  isChecked = (option) => {
    return this.state.selectedOption === option;
  }

  render() {

    const { optionOne, optionTwo } = this.props;
    const { selectedOption } = this.state;

    return (
      <div>
        <div className='question-title'>Would you rather...</div>
        <form onSubmit={this.handleSubmit}>
          <div className='question-option'>
            <input
              type="radio"
              value="optionOne"
              onChange={this.onOptionSelected}
              checked={this.isChecked("optionOne")}
            />
            {optionOne}
          </div>
          <div className="strong">or...</div>
          <div className='question-option'>
            <input
              type="radio"
              value="optionTwo"
              onChange={this.onOptionSelected}
              checked={this.isChecked("optionTwo")}
            />
            {optionTwo}
          </div>
          
          <div className='question-action'>
            <button 
              className='btn' 
              type="submit"
              disabled={selectedOption === null}
            >
              Vote
            </button>
          </div>
        </form>
      </div>
    );
  }
}

QuestionCardUnansweredContent.propTypes = {
  questionId: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired,
  authedUser: PropTypes.string.isRequired
};

const mapStateToProps = (state, currentProps) => {

  const qid = currentProps.id;
  const question = QuestionsSelectors.getContentById(state, qid);
  const authedUser = AuthedUserSelectors.getCurrent(state);

  return {
    questionId: qid,
    optionOne: question.optionOne,
    optionTwo: question.optionTwo,
    authedUser: authedUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  vote: (authedUser, questionId, option) => dispatch(QuestionsActions.handleAnswerQuestion(authedUser, questionId, option))
});

const QuestionCardUnansweredContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCardUnansweredContent);

export default QuestionCardUnansweredContentContainer;