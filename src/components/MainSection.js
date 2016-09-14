import React, { Component, PropTypes } from 'react';

class MainSection extends Component {

  render() {
    let nodes = [];
    for (let key in this.props.todos){
      nodes.push(<p key={key}>{this.props.todos[key].text}</p>)
    }
    return (
      <div>
        {nodes}
      </div>
    )
  }
}

export default MainSection;
