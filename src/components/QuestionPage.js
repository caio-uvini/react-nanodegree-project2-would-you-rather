import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as QuestionsSelectors from '../selectors/questions';

import NavBar from './NavBar';
import QuestionCard from './QuestionCard';
import QuestionCardAnsweredContent from './QuestionCardAnsweredContent';
import QuestionCardUnansweredContent from './QuestionCardUnansweredContent';

const QuestionPage = (props) => {

  const { questionId, answered, questionExists } = props;

  return (
    <div>
      <NavBar />
      <h1>Question Details</h1>
      <div className='question-details'>
        {
          questionExists 
          ? <QuestionCard id={questionId}>
            {
              answered
              ? <QuestionCardAnsweredContent id={questionId} />
              : <QuestionCardUnansweredContent id={questionId} />
            }
            </QuestionCard>
          : <div className='not-found'>Question not found!</div>
        }
      </div>
    </div>
  );
};

QuestionPage.propTypes = {
  questionId: PropTypes.string,
  questionExists: PropTypes.bool.isRequired,
  answered: PropTypes.bool
};

const mapStateToProps = (state, currentProps) => {

  const { id } = currentProps.match.params;

  if (!QuestionsSelectors.exists(state, id)) {
    return {
      questionExists: false
    };
  }

  const authedUser = AuthedUserSelectors.getCurrent(state);
  const chosenOption = QuestionsSelectors.getChosenOption(state, id, authedUser);

  return {
    questionId: id,
    questionExists: true,
    answered: chosenOption !== null
  };
};


const mapDispatchToProps = (dispatch) => ({});

const QuestionPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionPage)
);

export default QuestionPageContainer;