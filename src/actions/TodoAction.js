import AppDispatcher from '../dispatcher/AppDispatcher';

const TodoActions = {
  create: function(text) {

    AppDispatcher.dispatch({
      type: 'TODO_CREATE',
      text: text
    })
  }
}

export default TodoActions;
