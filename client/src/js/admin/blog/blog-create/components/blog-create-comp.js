import React, { Component } from "react"
import Rdom from "react-dom"

class BlogCreateComp extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: "",
      content: ""
    }
  }
  render() {
    return (
      <div id="blog-create-comp">
        <label>Title</label>
        <input name="title" type="text" value={ this.state.title } onChange={ this.onChangeTitleHandler.bind(this) } /> <br/>
        <label>Content</label>
        <input name="content" type="text" value={ this.state.content } onChange={ this.onChangeContentHandler.bind(this) } /> <br/>
        <button onClick={ this.PostAnArticle.bind(this) }> Post </button>
      </div>
    )
  }
  onChangeTitleHandler(event) {
    this.setState({
      title: event.target.value
    })
  }
  onChangeContentHandler(event) {
    this.setState({
      content: event.target.value
    })
  }
  PostAnArticle(){
    $.ajax({
      url: "/api/blogs",
      method: "POST",      
      dataType: "json",
      data: {
        title: this.state.title,
        content: this.state.content,
        enable: true
      },
      success: function(){
        console.log(arguments);
      }
    })
    console.log(this.state);
  }
}

export default BlogCreateComp
