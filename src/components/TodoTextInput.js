import React, { Component, PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

class TodoTextInput extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.props.onSave(e.target.value.trim())
      this.setState({
        value: ''
      })
    }
  }

  render() {
    return(
      <input
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        value={this.state.value}
      />
    )
  }
}

export default TodoTextInput
