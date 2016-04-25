import React, { Component } from "react"
import ArticleItemComp from "./components/article-item-comp"

class ArticleItem extends Component {
  render(){
    let { params } = this.props
    return (
      <ArticleItemComp id={ params.id } />
    )
  }
}

export default {
  path: "article/:id",
  getChildRoutes( location, cb){
    cb(null, [])
  },
  getComponent( location, cb){
    cb(null, ArticleItem)
  }
}
