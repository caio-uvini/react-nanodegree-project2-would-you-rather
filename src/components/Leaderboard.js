import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthedUserSelectors from '../selectors/authedUser';
import * as UsersSelectors from '../selectors/users';

import NavBar from './NavBar';
import LeaderboardEntry from './LeaderboardEntry';

class Leaderboard extends Component {

  render() {
    const {authedUser, leaderboard} = this.props;
    return (
      <div>
        <NavBar />
        <h1>Leaderboard</h1>
        <ul>
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
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authedUser: AuthedUserSelectors.getCurrent(state),
  leaderboard: UsersSelectors.getLeaderboard(state)
})
const mapDispatchToProps = (dispatch) => ({})

const LeaderboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);

export default LeaderboardContainer;