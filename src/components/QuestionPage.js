import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as QuestionsSelectors from '../selectors/questions';

import NavBar from './NavBar';
import QuestionCard from './QuestionCard';
import QuestionCardAnsweredContent from './QuestionCardAnsweredContent';
import QuestionCardUnansweredContent from './QuestionCardUnansweredContent';

class QuestionPage extends Component {

  render() {

    const { questionId, answered, questionExists } = this.props;

    return (
      <div>
        <NavBar />
        <h2>Question Details</h2>
        {
          questionExists 
          ? <QuestionCard id={questionId}>
            {
              answered
              ? <QuestionCardAnsweredContent id={questionId} />
              : <QuestionCardUnansweredContent id={questionId} />
            }
            </QuestionCard>
          : <div>Question not found!</div>
        }
        
      </div>
    )
  }

}

const mapStateToProps = (state, currentProps) => {

  const { id } = currentProps.match.params

  if (!QuestionsSelectors.exists(state, id)) {
    return {
      questionExists: false
    }
  }

  const authedUser = AuthedUserSelectors.getCurrent(state);
  const chosenOption = QuestionsSelectors.getChosenOption(state, id, authedUser);

  return {
    questionId: id,
    questionExists: true,
    answered: chosenOption !== null
  }
}


const mapDispatchToProps = (dispatch) => ({})

const QuestionPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionPage)
);

export default QuestionPageContainer;