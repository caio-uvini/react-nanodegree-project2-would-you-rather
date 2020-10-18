import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as QuestionsSelectors from '../selectors/questions';

class QuestionCardPreviewContent extends Component {

  render() {

    const { optionOne, optionTwo } = this.props;

    return (
      <div style={{ margin: '5px' }}>
        Would you rather...
        <div>
          {optionOne}
        </div>
        or...
        <div>
          {optionTwo}
        </div>
        <div>
          <a href='/'>See Poll</a>
        </div>
      </div>
    )

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
}

const mapDispatchToProps = (dispatch) => ({})

const QuestionCardPreviewContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCardPreviewContent);

export default QuestionCardPreviewContentContainer;