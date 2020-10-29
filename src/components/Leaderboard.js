import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

import LeaderboardEntry from './LeaderboardEntry';

const Leaderboard = (props) => {
  
  const {authedUser, leaderboard} = props;
  
  return (
    <div>
      <h1>Leaderboard</h1>
      <div className='leaderboard'>
        {
          leaderboard.map((entry, idx) => <LeaderboardEntry 
              key={entry.user.id} 
              authedUser={authedUser} 
              position={idx+1} 
              user={entry.user} 
              score={entry.score} 
            />
          )
        }
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  authedUser: PropTypes.string.isRequired,
  leaderboard: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state),
  leaderboard: UsersSelectors.getLeaderboard(state)
});

const mapDispatchToProps = (dispatch) => ({});

const LeaderboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);

export default LeaderboardContainer;