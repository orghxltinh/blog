import React, { Component } from "react"
import ArticleCreateComp from "./components/article-create-comp"

class ArticleCreate extends Component {
  render (){
    return (
      <div id="article-create">
        <ArticleCreateComp />
      </div>
    )
  }
}

export default {
  path: "create",
  getChildRoutes( location, cb){
    cb( null, [])
  },
  getComponent( location, cb){
    cb( null, ArticleCreate)
  }
}
