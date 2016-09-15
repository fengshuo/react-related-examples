import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem'

class MainSection extends Component {

  render() {
    let nodes = [];
    
    for (let key in this.props.todos){
      nodes.push(<TodoItem key={key} todo={this.props.todos[key]} />)
    }
    return (
      <div>
        {nodes}
      </div>
    )
  }
}

export default MainSection;
