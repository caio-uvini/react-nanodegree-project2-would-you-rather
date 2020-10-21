import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as AuthedUserActions from '../actions/authedUser';
import * as UsersSelectors from '../selectors/users';

class LoginPage extends Component {

  state = {
    selectedValue: ""
  }

  handleSubmit = (event, onSignInCompleted) => {
    event.preventDefault();
    
    this.props.signIn(this.state.selectedValue);
    onSignInCompleted();
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState(() => ({
      selectedValue: value
    }))
  }

  render() {

    const { selectedValue } = this.state;
    const { users, history, location } = this.props;

    const { from } = location.state || { from: { pathname: '/'} };
    const redirect = () => history.replace(from);

    const options = users.map(user => (
      <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
      <div>
      	<h1>Would you rather...</h1>
	      <form onSubmit={(event) => this.handleSubmit(event, redirect)}>
	      	<label>
	      	  Choose your user to start:
		        <select value={selectedValue} onChange={this.handleChange}>
		          <option key="default" value="">---</option>
		          {options}
		        </select>
      		</label>
      		<input type="submit" value="Start" disabled={!selectedValue} />
      	</form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: UsersSelectors.getUsersForDisplay(state)
})

const mapDispatchToProps = (dispatch) => ({
	signIn: (userId) => dispatch(AuthedUserActions.signIn(userId))
})

const LoginPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);

export default LoginPageContainer;