import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp.react';


/*------------------------------

TodoStore:
1. A place to save state data for component
2. A place where you can emit changes to view so that thew view can update itself
3. A place to register callbacks for actions

Dispather:
1. flux.dispatcher is used to broadcase payloads to registered callbacks
2. (callbacks can be deferred until other callbacks have been executed)

Components:
1. There is one connection Component to listen to changes emitted from Store, and update state so that its subcomponents can be updated
2. pure view Components

TodoActions:
1. Usually it is triggered by user actions
2. Actions dispatch different actions and the correspondent registerd callback will be triggered
--------------------------------*/

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
)
