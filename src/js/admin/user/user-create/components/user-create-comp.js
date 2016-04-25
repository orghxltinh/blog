import React, { Component } from "react"
import Rdom from "react-dom"

class BlogCreateComp extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }
  render() {
    return (
      <div id="blog-create-comp">
        <label>Email</label>
        <input name="email" type="text" value={ this.state.email } onChange={ this.onChangeEmailHandler.bind(this) } /> <br/>
        <label>Password</label>
        <input name="password" type="password" value={ this.state.password } onChange={ this.onChangePasswordHandler.bind(this) } /> <br/>
        <button onClick={ this.PostAnArticle.bind(this) }> Post </button>
      </div>
    )
  }
  onChangeEmailHandler(event) {
    this.setState({
      email: event.target.value
    })
  }
  onChangePasswordHandler(event) {
    this.setState({
      password: event.target.value
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
