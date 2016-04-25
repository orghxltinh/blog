import React, { Component }  from "react"
import Rdom from "react-dom"
import BlogCreateComponent from "./components/blog-create-comp"

class BlogCreate extends Component{
    render(){
      return (
        <div id="blog-create">
          <BlogCreateComponent />
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
    cb( null, BlogCreate)
  }
}
