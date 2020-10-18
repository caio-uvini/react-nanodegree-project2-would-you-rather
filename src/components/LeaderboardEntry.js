import React from 'react';

const LeaderboardEntry = (props) => {

    const {authedUser, position, user, score} = props;

    const style = user.id === authedUser
      ? { fontWeight: 'bold'}
      : {}

    return (
      <ul>
        {       
          <li key={user.id} style={style}>
            <div># {position}</div>
            <div>User: {user.name} {user.avatarURL}</div>

            <div>Asked: {score.questions}</div>
            <div>Answered: {score.answers}</div>

            <div>Score: {score.total}</div>
          </li>
        }
      </ul>
    )
}

export default LeaderboardEntry;