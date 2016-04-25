import React, { Component } from "react"
import MainBlogHeader from "./main-blog-header"

class BlogHeader extends Component{
  render(){

    let { isAdmin } = this.props
    return (
      <div id="blog-header" className="row">
      {
        isAdmin ?
          <h3> this is admin blog header </h3>
          :
          <MainBlogHeader />
      }
      </div>
    )
    // if(isAdmin) {
    //   return (
    //
    //     <div id="blog-header">
    //       <h3> this is admin blog header </h3>
    //     </div>
    //   )
    // }else {
    //   return (
    //
    //     <div id="blog-header">
    //       <h3> this is blog header </h3>
    //     </div>
    //   )
    // }
  }
}

export default BlogHeader
