import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as QuestionsSelectors from '../selectors/questions';
import * as UsersSelectors from '../selectors/users';

import {formatDate} from '../utils/helpers';

class QuestionCard extends Component {

  render() {

    const { author, creationDate } = this.props;

    return (
      <div style={{ marginTop: '5px' }}>
        <hr />
        <div>
          Created by
          <div>
            
            <img 
              src={author.avatarURL} 
              alt={`Avatar of ${author.name}`} 
              style={{ 
                height: '50px',
                borderRadius: '25px'
              }}
            />
            
            <div>{author.name}</div>
          </div>
          on {creationDate}
        </div>
        
        {this.props.children}
        <hr />
      </div>
    )

  }

}

const mapStateToProps = (state, currentProps) => {

  const qid = currentProps.id;

  const question = QuestionsSelectors.getContentById(state, qid);
  const author = UsersSelectors.getUserForDisplay(state, question.author);

  return {
    author: author,
    creationDate: formatDate(question.creationTimestamp)
  }

}

const mapDispatchToProps = (dispatch) => ({})

const QuestionCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCard);

export default QuestionCardContainer;