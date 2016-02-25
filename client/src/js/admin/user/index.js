import React, { Component } from "react"
// import Home from "./blog-home"
// import Item from "./blog-item"
import UserHome from "./components/user-home"
import Create from "./user-create"

class Users extends Component{
  render(){
    let { children } = this.props
    return (
      <div id="blogs">
        { children }
      </div>
    )
  }
}

export default {
  path: 'users',
  indexRoute: { component: UserHome },
  getChildRoutes(location, cb) {
    cb(null, [
      Create
      // Home, Item, Create
    ])
  },

  getComponent(location, cb) {
    cb(null, Users )
  }
}
