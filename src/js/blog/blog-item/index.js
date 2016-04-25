import React, { Component } from "react"

class BlogItem extends Component{
  render(){
    // console.log("===blog item:",this.props);
    return (
      <div className="blog-item" id="blog-item">

      </div>
    )
  }
}

export default {

  path: ":blogItem",

  getChildRoutes( location, cb) {
    cb(null,[])
  },

  getComponent( location, cb) {
    cb( null, BlogItem)
  }
}
