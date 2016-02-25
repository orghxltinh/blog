import React, { Component } from "react"
import Rdom from "react-dom"
import { connect } from "react-redux"
import RouteComponent from "../../components/routeComponent"
import AdminHeader from "../components/admin-header"
import AdminFooter from "../components/admin-footer"
import { browserHistory } from "react-router"
import { bindActionCreators } from "redux"

class Admin extends RouteComponent{

  componentWillMount(){
    console.log("admin will mount props:", this.props);
    let { actions } = this.props
    console.log(actions);
    actions.enterAdmin();
  }

  componentWillUnmount(){

  }

  render() {

    console.log("admin props;", this.props);
    let { children } = this.props

    return (
      <div id="admin">

          {children}
        
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(window.actions.appConfig, dispatch)
  }
}

export default connect(undefined,mapDispatchToProps)(Admin)
