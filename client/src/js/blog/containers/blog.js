import React, { Component } from "react"
import BlogHeader from "../../components/blog-header"
import BlogFooter from "../../components/blog-footer"

class Blog extends Component{
  render(){
    return (
      <div id="blog">

        <div id="blog-content">
          { this.props.children }
        </div>
        
      </div>
    )
  }
}

export default Blog
