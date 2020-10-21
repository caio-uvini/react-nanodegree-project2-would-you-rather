import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';
import * as QuestionsSelectors from '../selectors/questions';

import QuestionCard from './QuestionCard';
import QuestionCardPreviewContent from './QuestionCardPreviewContent';

const FILTERS = {
  ANSWERED: 'answered',
  UNANSWERED: 'unanswered'
}

class QuestionList extends Component {

  state = {
    filterOption: FILTERS.UNANSWERED
  }

  onFilterChange = (event) => {
    const option = event.target.value;
    this.setState(() => ({
      filterOption: option
    }))
  }

  isChecked = (expectedOption, currentOption) => currentOption === expectedOption;

  getQuestions = (questionsByStatus, filterOption) => {

    if (!questionsByStatus) {
      return [];
    }

    if (this.isChecked(FILTERS.UNANSWERED, filterOption)) {
      return questionsByStatus.unansweredIds;
    }
    return questionsByStatus.answeredIds;
  }

  render() {

    const { filterOption } = this.state;
    const { questionsByStatus } = this.props;

    const questions = this.getQuestions(questionsByStatus, filterOption);

    return (
      <div>
	    <div>
          See questions: 
          <input
            type="radio"
            value={FILTERS.UNANSWERED}
            onChange={this.onFilterChange}
            checked={this.isChecked(FILTERS.UNANSWERED, filterOption)}
          />Unanswered

          <input
            type="radio"
            value={FILTERS.ANSWERED}
            onChange={this.onFilterChange}
            checked={this.isChecked(FILTERS.ANSWERED, filterOption)}
          />Answered
        </div>
        
        <div>
          {
            questions.map(questionId => {
              return (
                <div key={questionId}>
                  <QuestionCard id={questionId}>
                    <QuestionCardPreviewContent id={questionId} />
                  </QuestionCard>
                </div>
              )
            })
          }
        </div>
	  </div>
    )
  }

}


const mapStateToProps = (state) => {

  const authedUserId = AuthedUserSelectors.getCurrent(state);
  if (!authedUserId) {
    return {}
  }

  const answers = UsersSelectors.getAnswers(state, authedUserId)
  const questionsByStatus = QuestionsSelectors.getAllIdsGroupedByAnswerStatusSorted(state, answers);

  return {
    questionsByStatus: questionsByStatus
  }
}

const mapDispatchToProps = (dispatch) => ({})

const QuestionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionList);

export default QuestionListContainer;