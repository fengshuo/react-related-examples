import React, { Component } from 'react';
import Remarkable from 'remarkable';



class Comment extends Component {
  constructor(){
    super();
    this.rawMarkup = this.rawMarkup.bind(this)
  }
  rawMarkup() {
    let md = new Remarkable();
    let rawMarkup = md.render(this.props.children.toString());
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
          valur={this.state.text}
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

export default CommentBox;
