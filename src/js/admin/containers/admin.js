import React from 'react';
import { connect } from 'react-redux';
import RouteComponent from '../../components/routeComponent';
import { bindActionCreators } from 'redux';
// import { checkedIfTokenRemember, setAjaxDefaultHeader, setGlobalAjaxError } from '../actions/auth';

class Admin extends RouteComponent{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('admin will mount props:', this.props);
    const { actions, auth } = this.props;
    const { checkedIfTokenRemember, setAjaxDefaultHeader, setGlobalAjaxError } = hxltinh.actions.auth;
    actions.enterAdmin();
    auth.checkIsAuthenticationOn();

    const isRemembered = checkedIfTokenRemember();
    isRemembered && setAjaxDefaultHeader();
    setGlobalAjaxError();
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.leaveAdmin();
    const { unSetAjaxDefaultHeader } = hxltinh.actions.auth;
    unSetAjaxDefaultHeader();
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log('nextProps:', nextProps);
  //   if(!nextProps.isLogin) {
  //     hxltinh.actions.auth.goToLoginPage();
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    console.debug('props;', this.props);
    const { children } = this.props;
    return (
      <div id='admin'>
          {children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(window.hxltinh.actions.appConfig, dispatch),
    auth: bindActionCreators(window.hxltinh.actions.auth, dispatch)
  };
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.get('isLogin'),
    isLoginPage: state.appConfig.isLoginPage
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
