import React, { Component } from 'react'

export default class ValidationResults extends Component {
  render() {
    return (
      <div>
        {this.props.passErr ? (
          <p style={{ color: 'tomato' }} className="fa fa-close">
            {' '}
            Passwords do not match
          </p>
        ) : (
          <p style={{ color: 'green' }} className="fa fa-check">
            {' '}
            Passwords match
          </p>
        )}
      </div>
    );
  }
}
