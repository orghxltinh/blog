"use strict"
import React from "react"
import Rdom from "react-dom"
import { Router, Route, Link, browserHistory, hashHistory } from "react-router"
import $ from "jquery"

class Comment extends React.Component {
  render(){
    return (
      <div className="comment-item">
        <h3>{this.props.content}</h3>
        <h4>{this.props.author}, {this.props.key}</h4>
      </div>
    );

  }
}

class CommentList extends React.Component {
  constructor(){
    super();
    console.log("commentlist - this: ",this.props);
  }
  componentDidMount(){
    console.log("comment list rendered");
  }
  render() {
    var i = 0;
    var commentNodes = this.props.data.map( (cm) => {
      i++;
      console.log("comment:",cm);
      return (
        <div key={cm.id }>
          <Comment content={cm.content} author={cm.author} />
        </div>
      )
    });
    return (
        <div className="comment-list">
          {commentNodes}
        </div>
    )
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <h4>this is comment form</h4>
    );
  }
}

class CommentBox extends React.Component {
  constructor(){
    super();
    this.state= {
        data : []
    };
  }
  componentDidMount(){

    $.get("/api/comments").then((res) => {
      this.setState({
        data : res
      })
    })
  }
  render() {
    return(
      <div className="comment-box">
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    )
  }
}

class Inbox extends React.Component {
  render() {
    return (
      <div className="inbox">
        <CommentBox />
      </div>

    )
  }
}

export default Inbox
