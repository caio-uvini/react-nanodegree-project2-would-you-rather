import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthedUserActions from '../actions/authedUser';
import * as UsersSelectors from '../selectors/users';

class LoginPage extends Component {

  state = {
    selectedValue: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signIn(this.state.selectedValue)
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState(() => ({
      selectedValue: value
    }))
  }

  render() {

    const {selectedValue} = this.state;
    const {users} = this.props;

    const options = users.map(user => (
      <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
      <div>
      	<h1>Would you rather...</h1>
	      <form onSubmit={this.handleSubmit}>
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

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageContainer;