import React, { Component, PropTypes } from 'react';
import TodoActions from '../actions/TodoAction'

class Header extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    
      TodoActions.create(e.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onBlur={this.handleChange} />
      </div>
    )
  }
}

export default Header;
