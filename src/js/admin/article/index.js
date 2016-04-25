import React, { Component } from "react"
import ArticleHome from "./containers/article-home"
// import Home from "./blog-home"
import Item from "./article-item"
import Create from "./article-create"

class Articles extends Component{
  render(){
    return (
      <div id="article">
        {this.props.children}
      </div>
    )
  }
}

export default {
  path: 'articles',
  indexRoute: { component: ArticleHome },
  getChildRoutes(location, cb) {
    cb(null, [
      Create, Item
    ])
  },

  getComponent(location, cb) {
    cb(null, Articles )
  }
}
