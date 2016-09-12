import React, { Component, PropTypes } from 'react';
import Remarkable from 'remarkable';



class Comment extends Component {
  constructor(){
    super();
    /*
      0. When write React app with ES6, you'll need to set up the initial state property in the constructore with `this.state`
      1. In a child class constructor, `this` cannot be used until `super` is called
      2. When to pass `props` in constructor: when you need to access `this.props` in constructor
      3. you can only use `super()` in a derived class, and you must call `super()` before accessing `this` in the constructor
    */
    this.rawMarkup = this.rawMarkup.bind(this)
  }
  rawMarkup() {
    let md = new Remarkable();
    let rawMarkup = md.render(this.props.children.toString());
    /*
      1. Usually, a component's children is an array of components
      But if there is only a single child, then this.props.children will be the single child itself without the array wrapper

      2. You can't access children of the component via this.props.children.
      In this example, you can't use this.props.children to get what's in <div className="comment"> (use refs instead:https://facebook.github.io/react/docs/more-about-refs.html)
      this.props.children refers to the children between <Comment></Comment> (which is defined in <CommentList />)
    */
    return {__html: rawMarkup}
  }

  render() {
    return (
      <div className="comment">
          <p>{this.props.author}</p>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}

class CommentList extends Component {

  render() {

    let nodes = this.props.data.map(comment => {
      return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
      )
    })
    return (
      <div className="commentList">
        {nodes}
      </div>
    )
  }
}

class CommentForm extends Component {
  constructor() {
    super()
    this.state = {author: '', text: ''}
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    /*
      In ES6 classes, there is no autobinding. You'll have to explicitly use either `bind(this)` or `arrow functions`
      - bind this in constructor is recommended
      - <div onClick={this.tick.bind(this)}>
      - <div onClick={() => this.tick()}>
    */
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }
  handleTextChange(e) {
    this.setState({text: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if(!text || !author) {
      return;
    }
    this.props.onCommitSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  }
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}/>
        <input
          type="text"
          placeholder="your content"
          value={this.state.text}
          onChange={this.handleTextChange}/>
        <input type="submit" value="Post Your Comment"/>
      </form>
    )
  }
}

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
    this.handleCommitSubmit = this.handleCommitSubmit.bind(this)
  }

  handleCommitSubmit(data) {
    data.id = Date.now();
    let comments = this.state.data;
    let newComments = comments.concat([data]);
    this.setState({data: newComments}); //update view before ajax request

    fetch(this.props.url, {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'author=' + data.author + '&text=' + data.text
    })
    .then(res => res.json())
    .then(json => this.setState({data: json}))
    .catch(err => console.log("fetch error"))

  }

  componentDidMount() {
    fetch(this.props.url)
    .then(res => res.json())
    .then(json => this.setState({data: json}))
    .catch(err => console.log("fetch error"))
  }

  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data}/>
        <CommentForm onCommitSubmit={this.handleCommitSubmit}/>
      </div>
    )
  }
}

CommentList.propTypes = {
  data: PropTypes.array.isRequired
}

// propTypes and defaultProps are defined as properties on the constructor in ES6

CommentForm.propTypes = {
  onCommitSubmit: PropTypes.func.isRequired
}



export default CommentBox;
