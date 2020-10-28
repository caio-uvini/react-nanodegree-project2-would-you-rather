import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as QuestionsSelectors from '../selectors/questions';

class QuestionCardAnsweredContent extends Component {

  formatOption = (optionText, optionStats, total) => {
    return `${optionText} - ${optionStats.count}/${total} (${optionStats.relative}%)`;
  }

  render() {

    const { chosenOption, content, stats } = this.props;

    const optOneText = this.formatOption(content.optionOne, stats.optionOne, stats.total);
    const optTwoText = this.formatOption(content.optionTwo, stats.optionTwo, stats.total);

    return (
      <div>
        <div className='question-title'>Would you rather...</div>
        <div className='question-option'>
          {chosenOption === 'optionOne' ? <b>{optOneText}</b> : optOneText}
        </div>
        <div className="strong">or...</div>
        <div className='question-option'>
          {chosenOption === 'optionTwo' ? <b>{optTwoText}</b>: optTwoText}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, currentProps) => {

  const qid = currentProps.id;

  const authedUser = AuthedUserSelectors.getCurrent(state);
  const question = QuestionsSelectors.getContentById(state, qid);
  const chosenOption = QuestionsSelectors.getChosenOption(state, qid, authedUser);
  const stats = QuestionsSelectors.getVotesStats(state, qid);

  return {
    questionId: qid,
    chosenOption: chosenOption,
    content: {
      optionOne: question.optionOne,
      optionTwo: question.optionTwo
    },
    stats: stats
  }
};

const mapDispatchToProps = (dispatch) => ({});

const QuestionCardAnsweredContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCardAnsweredContent);

export default QuestionCardAnsweredContentContainer;