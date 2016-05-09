import { Component } from 'react';

class RouteComponent extends Component {
  constructor(props) {
    super(props);
    this.x = 4;
  }
}

window.baseClass = window.baseClass || {};

window.baseClass.RouteComponent = RouteComponent;

window.hxltinh = window.hxltinh || {};
window.hxltinh.appConfig = window.hxltinh.appConfig || {};
window.hxltinh.appConfig.AUTHENTICATION_KEY = 'Authorization';
window.hxltinh.appConfig.AUTHENTICATION_USER_ID = 'userId';
window.hxltinh.appConfig.AUTHENTICATION_USER_MAIL = 'email';


// setGlobalAjaxError();
