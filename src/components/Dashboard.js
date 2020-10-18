import React, { Component } from 'react';

import NavBar from './NavBar'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class Dashboard extends Component {

  render() {
    return (
      <div>
      	<NavBar />
        <NewQuestion />
        <QuestionList />
        <Leaderboard />
      </div>
    )
  }
}

export default Dashboard;