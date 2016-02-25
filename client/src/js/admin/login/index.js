import React, { Component } from "react"
import LoginAction from "./components/login-action"

class Login extends Component{
  render(){
    return (
      <div id="login">
        <LoginAction />
      </div>
    )
  }
}

export default {
  path: "login",
  getChildRoutes( location, cb){
    cb(null,[])
  },
  getComponent( location, cb){
    cb(null, Login)
  }
}
