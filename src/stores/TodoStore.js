import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

let todos = {};
let CHANGE_EVENT = 'change';

let TodoStore = Object.assign({}, EventEmitter.prototype, {
  /*
    Store:
      1. Manage Data
      2. Notify change to view so that view will request new data for rendering
  */
  getAllTodo: function() {
    return todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT); // emit change when it receives change from dispatcher
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT,callback) // notify controller-viewer to request data
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
});

/*
  1. Register callback to handle actions
  2. These callbacks will be dispatched by actions in TodoAction.js
*/

AppDispatcher.register(function(action) {
  switch(action.type) {
    case 'TODO_CREATE':
      let text = action.text.trim();
      if (text !== '') {
        // add new todo into state data and emitchange(), see below
        create(text);
      }
    break;

    case 'TODO_UNDO_COMPLETE':
      update(action.id, {complete: false})
    break;

    case 'TODO_COMPLETE':
      update(action.id, {complete: true})
    break;


    default:

  }

  TodoStore.emitChange();
})

function create(text) {
  let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  todos[id] = {
    id: id,
    text: text,
    complete: false
  }
}

function update(id, data) {
  todos[id] = Object.assign({}, todos[id], data);
}


export default TodoStore;
