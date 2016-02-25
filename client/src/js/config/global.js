import jQuery from "jquery"
import React, { Component } from "react"

class RouteComponent extends Component {
  constructor(props) {
    super(props)
    console.log("=== route component:",props);
  }
}

window.baseClass = window.baseClass || {}

window.baseClass.RouteComponent = RouteComponent

window.$ = window.jQuery = jQuery

window.appConfig = window.appConfig || {}
window.appConfig.AUTHENTICATION_KEY = "Authorization"

var token = localStorage.getItem( appConfig.AUTHENTICATION_KEY );

if( !token ) { console.log( " ======================= Please Login ======================= " ) }
else {
  $.ajaxSetup({
    beforeSend: xhr => {
      xhr.setRequestHeader( appConfig.AUTHENTICATION_KEY, token )
    }
  })
}

$( document ).ajaxComplete( (event, xhr, settings) => {
  console.log("event:",event);
  console.log("xhr:",xhr);
  console.log("settings:",settings);
})
