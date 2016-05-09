import React, { Component }  from "react"
import Rdom from "react-dom"
import PostCreateComponent from "./components/post-create-comp"

class PostCreate extends Component{
    render(){
      return (
        <div id="post-create">
          <PostCreateComponent />
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
    cb( null, PostCreate)
  }
}
