import React, { Component } from 'react';
import LoginAction from './components/login-action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Login extends Component{
  componentWillMount(){
    hxltinh.actions.appConfig.enterLogin();
    this.props.appConfig.enterLogin();
  }
  componentWillUnmount() {
    this.props.appConfig.leaveLogin();
  }
  render(){

    return (
      <div id='login'>
        <LoginAction />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    appConfig: bindActionCreators(hxltinh.actions.appConfig, dispatch)
  };
}

const actionLogin = connect(null, mapDispatchToProps)(Login);

export default {
  path: 'login',
  getChildRoutes( location, cb){
    cb(null,[]);
  },
  getComponent( location, cb){
    cb(null, actionLogin);
  }
};
