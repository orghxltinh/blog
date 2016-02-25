import React, { Component } from "react"
import Home from "./blog-home"
import Item from "./blog-item"
import Create from "./blog-create"

class Blogs extends Component{
  render(){
    return (
      <div id="blogs">
        {this.props.children}
      </div>
    )
  }
}

export default {
  path: 'blogs',

  getChildRoutes(location, cb) {
    cb(null, [
      Home, Item, Create
    ])
  },

  getComponent(location, cb) {
    cb(null, Blogs )
  }
}
