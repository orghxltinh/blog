import React, { Component } from "react"

class BlogFooter extends Component{
  render(){
    let { isAdmin } = this.props

    if(isAdmin) {
      return (

        <div id="blog-footer">
          <h3> this is admin blog footer </h3>
        </div>
      )
    }else {
      return (

        <div id="blog-footer" className="row">
          <h3> this is blog footer </h3>
        </div>
      )
    }

  }
}

export default BlogFooter
