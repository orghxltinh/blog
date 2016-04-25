import React, { Component }  from "react"
import Rdom from "react-dom"
import UserCreateComponent from "../components/user-create-comp"

class BlogCreate extends Component{
    render(){
      return (
        <div id="blog-create">
          <UserCreateComponent />
        </div>
      )
    }
}

export default BlogCreate
