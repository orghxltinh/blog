import React, { Component } from "react"
import BlogItem from "./blog-item"

class BlogHome extends Component{
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

class HomePage extends Component {
  render() {
    return (
      <div>
        This is home page
      </div>
    );
  }
}


export default {

  path: "blog",
  indexRoute: { component: HomePage },
  getChildRoutes( location, cb) {
    cb( null, [ BlogItem ])
  },

  getComponent( location, cb) {
    cb( null, BlogHome)
  }
}
