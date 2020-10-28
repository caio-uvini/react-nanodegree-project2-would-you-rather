import React from 'react';
import { connect } from 'react-redux';

import * as QuestionsSelectors from '../selectors/questions';
import * as UsersSelectors from '../selectors/users';

import {formatDate} from '../utils/helpers';

const QuestionCard = (props) => {

  const { author, creationDate } = props;

  return (
    <div className='question-card'>
      <div className='question-author'>
        <img 
          src={author.avatarURL} 
          alt={`Avatar of ${author.name}`} 
          className='avatar'
        />
        <div>{author.name}</div>
        <span className='question-created-at'>{creationDate}</span>
      </div>        
      <div className='question-content'>{props.children}</div>
    </div>
  );
};

const mapStateToProps = (state, currentProps) => {

  const qid = currentProps.id;

  const question = QuestionsSelectors.getContentById(state, qid);
  const author = UsersSelectors.getUserForDisplay(state, question.author);

  return {
    author: author,
    creationDate: formatDate(question.creationTimestamp)
  }
};

const mapDispatchToProps = (dispatch) => ({});

const QuestionCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCard);

export default QuestionCardContainer;