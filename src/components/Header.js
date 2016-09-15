import React, { Component, PropTypes } from 'react';
import TodoActions from '../actions/TodoAction';
import TodoTextInput from './TodoTextInput';

class Header extends Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
      if (text.trim()) {
        TodoActions.create(text);
      }
  }

  render() {
    return (
      <div>
        <TodoTextInput
          placeholder="enter todo content"
          onSave={this.handleSave}
         />
      </div>
    )
  }
}

export default Header;
