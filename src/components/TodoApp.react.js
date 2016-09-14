import React, { Component, PropTypes } from 'react';
import MainSection from './MainSection';
import Header from './Header';
import TodoStore from '../stores/TodoStore';

class TodoApp extends Component {
  constructor() {
    super()
    this.state = TodoStore.getAllTodo();
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState(TodoStore.getAllTodo()); // update state to render new state
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  render() {
    return (
        <div>
          <Header />
          <MainSection
            todos={this.state}
            />
        </div>
    )
  }
}

export default TodoApp;
