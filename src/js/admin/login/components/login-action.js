import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class LoginAction extends Component{

  constructor(){
    super();
    this.state = {
      email : '',
      password : ''
    };
  }

  render(){
    return (
      <form id='login-form'>
        <input type='text' value={ this.state.email } onChange={ this.handleEmailChange.bind( this ) } /><br/>
        <input type='password' value={ this.state.password } onChange={ this.handlePasswordChange.bind( this ) } /><br/>
        <button type="submit" onClick={ this.submitAction.bind(this) }>Login</button>
      </form>
    );
  }

  handleEmailChange(event){
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event){
    this.setState({ password: event.target.value });
  }

  submitAction(event){
    event.preventDefault();
    const { rememberAuth, goToAdminPage, goToLoginPage, setAjaxDefaultHeader } = hxltinh.actions.auth;

    this.props.dispatch(hxltinh.actions.auth.
      loginAction(this.state.email, this.state.password)).then((res) => {
        const isRemembered = rememberAuth(res);
        isRemembered && setAjaxDefaultHeader();
        isRemembered ? goToAdminPage() : goToLoginPage();
      });
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.get('auth') ? state.auth.get('auth').toJS() : null,
    isLoading: state.auth.get('isLoading')
  };
};

export default connect(mapStateToProps)(LoginAction);
