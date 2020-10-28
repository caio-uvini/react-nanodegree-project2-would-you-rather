import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as QuestionsSelectors from '../selectors/questions';

class QuestionCardPreviewContent extends Component {

  handleSeePoll = (history, questionId) => {
    history.push(`/questions/${questionId}`);
  }

  render() {

    const { optionOne, optionTwo, history, questionId } = this.props;

    const seePoll = () => this.handleSeePoll(history, questionId);

    return (
      <div>
        <div className='question-title'>Would you rather...</div>
        <div>
          <div className='question-option'>
            {optionOne}
          </div>
          <div className='strong'>or...</div>
          <div className='question-option'>
            {optionTwo}
          </div>
          <div className='question-action'>
            <button className='btn' onClick={seePoll}>
              See Poll
            </button>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, currentProps) => {

  const qid = currentProps.id;
  const question = QuestionsSelectors.getContentById(state, qid);

  return {
    questionId: qid,
    optionOne: question.optionOne,
    optionTwo: question.optionTwo
  }
};

const mapDispatchToProps = (dispatch) => ({});

const QuestionCardPreviewContentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionCardPreviewContent)
);

export default QuestionCardPreviewContentContainer;