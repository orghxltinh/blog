import { browserHistory } from 'react-router';

let pathName = window.location.pathname;
const regex = /(admin)/;
const isLoginRegex = /(login)/;
// var isMatch = pathName.test(regex);
const isAdmin = regex.test(pathName);
const isLoginPage = regex.test(isLoginPage);
// console.log('is match:', isAdmin);

const initialState = {
  isAdmin,
  isLoginPage
};

export default function( state = initialState, action ){
  const { appConfig } = hxltinh.actions;
  switch (action.type) {
  case appConfig.ENTER_ADMIN:
    return Object.assign({}, state, { isAdmin: true });

  case appConfig.LEAVE_ADMIN:
    return Object.assign({}, state, { isAdmin: false });

  case appConfig.ENTER_LOGIN:
    return Object.assign({}, state, { isLoginPage: true });

  case appConfig.LEAVE_LOGIN:
    return Object.assign({}, state, { isLoginPage: false });

  default:
    return state;
  }
}
