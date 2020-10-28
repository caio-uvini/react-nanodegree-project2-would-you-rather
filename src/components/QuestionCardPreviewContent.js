import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as QuestionsSelectors from '../selectors/questions';

const QuestionCardPreviewContent = (props) => {

  const handleSeePoll = (history, questionId) => {
    history.push(`/questions/${questionId}`);
  };

  const { optionOne, optionTwo, history, questionId } = props;

  const seePoll = () => handleSeePoll(history, questionId);

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
};

QuestionCardPreviewContent.propTypes = {
  questionId: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired
};

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