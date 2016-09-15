import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TodoActions from '../actions/TodoAction';

class TodoItem extends Component {
  constructor() {
    super();
    this.onToggleComplete = this.onToggleComplete.bind(this);
  }

  onToggleComplete() {
    TodoActions.toggleComplete(this.props.todo)
  }

  render() {
    let todo = this.props.todo;

    return(
      <li className={ todo.complete ? 'completed' : '' }>
        <div>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={this.onToggleComplete}
          />
          <span>{todo.text}</span>

        </div>
      </li>
    )
  }
}

export default TodoItem
