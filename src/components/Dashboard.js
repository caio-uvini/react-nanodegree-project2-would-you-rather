import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';
import * as QuestionsSelectors from '../selectors/questions';

import NavBar from './NavBar'

const FILTERS = {
  ANSWERED: 'answered',
  UNANSWERED: 'unanswered'
}

class Dashboard extends Component {

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
      return questionsByStatus.answeredIds;
    }
    return questionsByStatus.unansweredIds
  }

  render() {

    const {filterOption} = this.state;
    const {questionsByStatus} = this.props;

    const questions = this.getQuestions(questionsByStatus, filterOption);

    return (
      <div>
      	<NavBar />
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
          />Unanswered
        </div>
        
        <div>
        {
          questions.map(questionId => <li key={questionId}>{questionId}</li>)
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
  const questionsByStatus = QuestionsSelectors.getAllIdsGroupedByAnswerStatus(state, answers);

  return {
    questionsByStatus: questionsByStatus
  }
}

const mapDispatchToProps = (dispatch) => ({})

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;