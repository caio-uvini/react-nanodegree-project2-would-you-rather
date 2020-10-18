import React, { Component } from 'react';

import NavBar from './NavBar'
import QuestionList from './QuestionList'
import NewQuestion from './NewQuestion'

class Dashboard extends Component {

  render() {
    return (
      <div>
      	<NavBar />
        <NewQuestion />
        <QuestionList />
      </div>
    )
  }
}

export default Dashboard;