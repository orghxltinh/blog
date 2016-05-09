import React, { Component } from "react"
import CategoryItemComp from "./components/category-item-comp"

class ArticleItem extends Component {
  render(){
    let { params } = this.props;
    return (
      <CategoryItemComp id={ params.id } />
    )
  }
}

export default {
  path: "category/:id",
  getChildRoutes( location, cb){
    cb(null, [])
  },
  getComponent( location, cb){
    cb(null, ArticleItem)
  }
}
