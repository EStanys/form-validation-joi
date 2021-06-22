import React, { Component } from 'react'
import Joi from 'joi-browser'
import ValidationResults from './ValidationResults';

export default class MainForm extends Component {
  state = {
    account: { userName: '', email: '', password: '', repeatPassword: '', agreement: '' },
    errors: {},
    errorMessages: {
      agreement: "Please confirm terms and conditions",
      repeatPassword: "Passwords must match"
    }
  };

  // validation schema

  schema = {
    userName: Joi.string().min(3).required().label('Username'),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(4).required(),
    repeatPassword: Joi.ref('password'),
    agreement: Joi.boolean().required().invalid(false),
  };
  
  resetErrors(){
 this.setState({ errors: {} });
 this.state.account.agreement === false && this.setState({account: {...this.state.account, agreement: ''}})
 }
  

  formSubmitHandler = async (e) => {
    e.preventDefault();
    await this.resetErrors();
    this.validateForm();
  };

  syncInput = (e) => {
    const { name, value } = e.target;
    this.setState({ account: { ...this.state.account, [name]: value } });
    this.validateProperty(name, value);
  };

  validateProperty(name, value) {
    const obj = { [name]: value}
    const schema = {[name]: this.schema[name]}
    const result = Joi.validate(obj, schema);
    if (result.error) {
      console.log('cia', result.error.details[0].message);
      this.setState({ errors: { ...this.state.errors, [name]: result.error.details[0].message } });
    } else {
      const errorsCopy = { ...this.state.errors}
      delete errorsCopy[name]
      this.setState({ errors: errorsCopy });
    }
  }

  syncCheck = (e) => {
    this.setState({ account: { ...this.state.account, agreement: e.target.checked } });
  };

  validateForm() {
    // const result = Joi.validate(this.state.account, this.schema) // sustos surades klaida
    const result = Joi.validate(this.state.account, this.schema, { abortEarly: false }); // nesustos surades klaida

    if (!result.error) return;

    const errors = {};
    // errors.userName = result.error.details
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    this.setState({ errors: errors });
    console.log('local errors', errors);
    // if (this.state.account.userName.length === 0) {
    //   this.setState({ errors: { userName: '*required field' } });
    //   return;
    // }
    // if (this.state.account.userName.length <= 3) {
    //   this.setState({ errors: { userName: '*user name must be at least 4 letters' } });
    //   return;
    // }
  }

  passProps(){
    if (this.state.errors.password) return true;
    if (this.state.errors.repeatPassword) return true;
    return false
  }

  render() {
    return (
      <div className="main-form">
        <h1>Main form</h1>
        <div className="flex">
          <form onSubmit={this.formSubmitHandler}>
            <label htmlFor="userName">User name</label>
            <input
              value={this.state.account.userName}
              className={this.state.errors.userName && 'isInvalid'}
              type="text"
              name="userName"
              onChange={this.syncInput}
            />
            {this.state.errors.userName && <p className="err-msg">{this.state.errors.userName}</p>}

            <label htmlFor="email">Email</label>
            <input
              value={this.state.account.email}
              className={this.state.errors.email && 'isInvalid'}
              type="text"
              name="email"
              onChange={this.syncInput}
            />
            {this.state.errors.email && <p className="err-msg">{this.state.errors.email}</p>}

            <label htmlFor="password">Password</label>
            <input
              value={this.state.account.password}
              className={this.state.errors.password && 'isInvalid'}
              type="text"
              name="password"
              onChange={this.syncInput}
            />
            {this.state.errors.password && <p className="err-msg">{this.state.errors.password}</p>}

            <label htmlFor="repeatPassword">Reapeat password</label>
            <input
              value={this.state.account.repeatPassword}
              className={this.state.errors.repeatPassword && 'isInvalid'}
              type="text"
              name="repeatPassword"
              onChange={this.syncInput}
            />
            {this.state.errors.repeatPassword && <p className="err-msg">{this.state.errorMessages.repeatPassword}</p>}

            <div className="main-form__agreement">
              <input
                value={this.state.account.agreement}
                className={this.state.errors.agreement && 'isInvalid'}
                type="checkbox"
                name="agreement"
                onChange={this.syncCheck}
              />
              <label htmlFor="agreement">Agreement</label>
            </div>
            {this.state.errors.agreement && <p className="err-msg">{this.state.errorMessages.agreement}</p>}

            <button>Submit</button>
          </form>
          <ValidationResults passErr={this.passProps()} />
        </div>
      </div>
    );
  }
}

