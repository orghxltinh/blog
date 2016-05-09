import React, { Component } from "react"
import PostItemComp from "./components/post-item-comp"

class PostItem extends Component {
  render(){
    let { params } = this.props
    return (
      <PostItemComp id={ params.id } />
    )
  }
}

export default {
  path: 'post/:id',

  getChildRoutes(location, cb) {
    cb(null, [
    ])
  },

  getComponent(location, cb) {
    cb(null, PostItem )
  } 
}
