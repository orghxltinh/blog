"use strict"

window.__webpack_public_path__ = "http://localhost:8080/assets"
window.__webpack_require__ = window.__webpack_require__ || {}
window.__webpack_require__.p = 'http://localhost:8080/';
//load config first
import "./config/api-url"
import "./config/global"

//load global CSS
// import "!style!css!sass!./sass/foundation.scss"
import "./sass/main.scss"

import React from "react"
import Rdom from "react-dom"
import { Router, Route, Link, browserHistory, hashHistory } from "react-router"
import { Provider } from "react-redux"

import About from "./about"
import Inbox from "./inbox"
import Admin from "./admin"
import Home from "./blog"
import DefaultHome from "./components/home"

import BlogHeader from "./components/blog-header"
import BlogFooter from "./components/blog-footer"

import { connect } from "react-redux"

import "./actions"

import configureStore from "./stores/configureStore"
//
// browserHistory.listenBefore( () => {
//   console.log("this is hook");
// });

class App extends React.Component {
  constructor(){
    super();
  }
  componentDidMount(){
    // setTimeout(function(){
    //   browserHistory.push("/admin/blogs/home")
    // },3000)
  }

  render(){
    console.log("this is main app props:",this.props);
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

Rdom.render( (
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRoute} />
  </Provider>
  ), document.getElementById( "main-app" ) );
