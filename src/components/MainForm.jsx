import React, { Component } from 'react'

export default class MainForm extends Component {
  state = {
    account: { userName: '', email: '', password: '', repeatPassword: '', agreement: false},
    errors: {

    }
  };

  formSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({errors: {}})
    this.validateForm()
  };

  syncInput = (e) => {
    this.setState({account: { ...this.state.account, [e.target.name]: e.target.value}})
    
  }

  syncCheck = (e) => {
    this.setState({ account: { ...this.state.account, agreement: e.target.checked } });
     
  }



  validateForm (){
    if (this.state.account.userName.length === 0) {
      this.setState({ errors: { userName: '*required field'}})
      return
    }
    if (this.state.account.userName.length <= 3) {
      this.setState({ errors: { userName: '*user name must be at least 4 letters'}})
      return
    }
  }

  render() {
    return (
      <div className="main-form">
        <h1>Main form</h1>
        <form onSubmit={this.formSubmitHandler}>
          <label htmlFor="userName">User name</label>
          <input
            value={this.state.account.userName}
            className={this.state.errors.userName && "isInvalid"}
            type="text"
            name="userName"
            onChange={this.syncInput}
          />
          {this.state.errors.userName && <p className="err-msg">{this.state.errors.userName}</p>}
          <label htmlFor="email">Email</label>
          <input value={this.state.account.email} type="text" name="email" onChange={this.syncInput} />

          <label htmlFor="password">Password</label>
          <input value={this.state.account.password} type="text" name="password" onChange={this.syncInput} />

          <label htmlFor="repeatPassword">Reapeat password</label>
          <input
            value={this.state.account.repeatPassword}
            type="text"
            name="repeatPassword"
            onChange={this.syncInput}
          />

          <div className="main-form__agreement">
            <input value={this.state.account.agreement} type="checkbox" name="agreement" onChange={this.syncCheck} />
            <label htmlFor="agreement">Agreement</label>
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

