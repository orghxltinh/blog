"use strict"

//load config first
import "./config/api-url"
import "./config/global"
import "tinymce/skins/lightgray/skin.min.css"

//load global CSS

import "../sass/main.scss"

import React from "react"
import Rdom from "react-dom"
import { Router, Route, Link, browserHistory, hashHistory } from "react-router"
import { Provider } from "react-redux"

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import About from "./about"
import Inbox from "./inbox"
import Admin from "./admin"
import Home from "./blog"
import DefaultHome from "./components/home"

import BlogHeader from "./components/blog-header"
import BlogFooter from "./components/blog-footer"

import { connect } from "react-redux"

import "./actions"
import "./components"


import configureStore from "./stores/configureStore"
//
// browserHistory.listenBefore( () => {
//   console.log("this is hook");
// });

console.log("evironment:",process.env.NODE_ENV);

class App extends React.Component {
  constructor(){
    super();
  }

  render(){

    let { isAdmin } = this.props
    return (
      <div id="main-app-content">
        <BlogHeader isAdmin={ isAdmin } />
        <div id="body-app-content">
          <div id="body-app-wrapper">
            {this.props.children}
          </div>
        </div>
        <BlogFooter isAdmin={ isAdmin } />
      </div>
    )
  }
}

const mapStateToProp = (state) => {
  return {
    isAdmin : state.appConfig.isAdmin
  }
}

const _App = connect(mapStateToProp)(App)

const rootRoute = {
  component: "div",
  childRoutes: [{
    path: "/",
    indexRoute: { component: DefaultHome },
    onEnter: function(){
      console.log("main onenter");
    },
    component: _App,
    childRoutes: [
      Admin, Home
    ]
  }]
}


const store = configureStore()

$(document).ready( ()=> {
  Rdom.render( (
    <Provider store={store}>
      <Router history={browserHistory} routes={rootRoute} />
    </Provider>
    ), document.getElementById( "main-app" ) );
});
