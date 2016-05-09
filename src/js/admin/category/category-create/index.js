import React, { Component } from "react"
import CategoryCreateComp from "./components/category-create-comp"

class CategoryCreate extends Component {
  render (){
    return (
      <div id="category-create">
        <CategoryCreateComp />
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
    cb( null, CategoryCreate)
  }
}
