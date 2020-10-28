import React from 'react';
import { connect } from 'react-redux';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

import NavBar from './NavBar';
import LeaderboardEntry from './LeaderboardEntry';

const Leaderboard = (props) => {
  
  const {authedUser, leaderboard} = props;
  
  return (
    <div>
      <NavBar />
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