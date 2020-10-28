import React, { Component } from 'react';

import NavBar from './NavBar';
import QuestionList from './QuestionList';

class Dashboard extends Component {

  render() {
    return (
      <div>
      	<NavBar />
        <QuestionList />
      </div>
    );
  }
}

export default Dashboard;