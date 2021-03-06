import React from 'react';
import PropTypes from 'prop-types';

const LeaderboardEntry = (props) => {

    const {authedUser, position, user, score} = props;

    const currentUserClass = user.id === authedUser 
      ? 'leaderboard-entry-current-user'
      : null;

    return (
      <div className={`leaderboard-entry ${currentUserClass}`}>
        <div className='leaderboard-entry-user'>
          <img 
            src={user.avatarURL} 
            alt={`Avatar of ${user.name}`} 
            className='avatar'
          />
          <div>
            <span># {position} | </span>
            <span>{user.name}</span>
          </div>
        </div>  

        <div className='leaderboard-entry-stat'>
          <div>Asked</div>
          <div>{score.questions}</div>
        </div>

        <div className='leaderboard-entry-stat'>
          <div>Answered</div>
          <div>{score.answers}</div>
        </div>

        <div className='leaderboard-entry-score strong'>
          <div>Score</div>
          <div>{score.total}</div>
        </div>
      </div>
    );
};

LeaderboardEntry.propTypes = {
  authedUser: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired
};

export default LeaderboardEntry;