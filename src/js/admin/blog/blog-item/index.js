import React, { Component } from "react"
import BlogItemComp from "./components/blog-item-comp"

class BlogItem extends Component {
  render(){
    let { params } = this.props
    return (
      <BlogItemComp id={ params.id } />
    )
  }
}

export default {
  path: 'blog/:id',

  getChildRoutes(location, cb) {
    cb(null, [
    ])
  },

  getComponent(location, cb) {
    cb(null, BlogItem )
  }
}
