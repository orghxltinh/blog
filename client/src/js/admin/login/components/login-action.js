import React, { Component } from "react"
import { browserHistory } from 'react-router'

class LoginAction extends Component{

  constructor(){
      super()
      this.state = {
        email : "",
        password : ""
      }
      this.loginHandle = this.loginHandle.bind(this)
  }

  render(){
    return (
      <div id="login-form">
        <input type="text" value={ this.state.email } onChange={ this.handleEmailChange.bind( this ) } /><br/>
        <input type="password" value={ this.state.password } onChange={ this.handlePasswordChange.bind( this ) } /><br/>
        <button onClick={ this.submitAction.bind(this) }>Login</button>
      </div>
    )
  }

  handleEmailChange(event){
    this.setState( { email: event.target.value } )
  }

  handlePasswordChange(event){
    this.setState( { password: event.target.value } )
  }

  submitAction(event){

    this.loginHandle()
    .then( (res) => {
      var token = res.token || false;
      token ? localStorage.setItem( appConfig.AUTHENTICATION_KEY, token) : localStorage.removeItem( appConfig.AUTHENTICATION_KEY )

      token &&
      $.ajaxSetup({
        beforeSend: xhr => {
          xhr.setRequestHeader( appConfig.AUTHENTICATION_KEY, token )
        }
      })

      browserHistory.push("/admin")

    })
    .catch( (error) => {
      localStorage.removeItem( appConfig.AUTHENTICATION_KEY )
      $.ajaxSetup({
        beforeSend: xhr => {
          return false
        }
      })
    })
    // var pm = $.ajax({
    //   url: "/api/login",
    //   method: "POST",
    //   data: {
    //     email: this.state.email,
    //     password: this.state.password
    //   },
    //   dataType: "json",
    //   success: function(){
    //     console.log(arguments);
    //   }
    // })
  }

  loginHandle(){
    return new Promise( ( resolve, reject) => {
      $.ajax({
        url: "/api/login",
        method: "POST",
        data: {
          email: this.state.email,
          password: this.state.password
        },
        dataType: "json",
        success: function(){
          resolve.apply(this,arguments)
        },
        error: function(err){
          reject(err)
        }
      })
    })
  }
}

export default LoginAction
