import AppDispatcher from '../dispatcher/AppDispatcher';

const TodoActions = {
  create: function(text) {
    AppDispatcher.dispatch({
      type: 'TODO_CREATE',
      text: text
    })
  },

  toggleComplete: function(todo) {
    AppDispatcher.dispatch({
      type: todo.complete ? 'TODO_UNDO_COMPLETE' : 'TODO_COMPLETE',
      id: todo.id
    })
  },

  
}

export default TodoActions;
