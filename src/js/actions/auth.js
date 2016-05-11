import { browserHistory } from 'react-router';

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const ACCOUNT_IS_EXPIRED = 'ACCOUNT_IS_EXPIRED';
export const ACCOUNT_IS_VALID = 'ACCOUNT_IS_VALID';
export const USER_ALL_SESSIONS = 'USER_ALL_SESSIONS';
export const USER_DONT_HAVE_SESSION_OR_ERROR = 'USER_DONT_HAVE_SESSION_OR_ERROR';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export function allUserSessions(data) {
  return { type: 'USER_ALL_SESSIONS', data };
}

export function noUserSession() {
  return { type: 'USER_DONT_HAVE_SESSION_OR_ERROR' };
}

export function stillInSession() {
  return { type: 'ACCOUNT_IS_VALID' };
}
export function outOfSession() {
  return { type: 'ACCOUNT_IS_EXPIRED' };
}

export function checkIsAuthenticationOn() {
  const access_token = localStorage.getItem(hxltinh.appConfig.AUTHENTICATION_KEY);
  const userId = localStorage.getItem(hxltinh.appConfig.AUTHENTICATION_USER_ID);
  return dispatch => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${hxltinh.apiUrl.users}/${userId}/accessTokens`, method: 'GET', dataType: 'JSON',
        data: { access_token },
        success: res => {
          resolve(res);
          return dispatch(allUserSessions(res));
        },
        error: err => {
          reject(err);
          return dispatch(noUserSession());
        }
      });
    });

  };
}


export function rememberAuth(authInfo) {
  const haveToken = !!authInfo.token;
  if (haveToken) {
    localStorage.setItem(hxltinh.appConfig.AUTHENTICATION_KEY, authInfo.token);
    localStorage.setItem(hxltinh.appConfig.AUTHENTICATION_USER_ID, authInfo.userId);
    localStorage.setItem(hxltinh.appConfig.AUTHENTICATION_USER_MAIL, authInfo.email);
    return true;
  }

  forgetAuth();
  return false;
}

export function forgetAuth() {
  localStorage.removeItem(hxltinh.appConfig.AUTHENTICATION_KEY );
  localStorage.removeItem(hxltinh.appConfig.AUTHENTICATION_USER_ID);
  localStorage.removeItem(hxltinh.appConfig.AUTHENTICATION_USER_MAIL);
}

export function goToAdminPage() {
  return browserHistory.push('/admin');
}

export function goToLoginPage() {
  return browserHistory.push('/admin/login');
}

export function setAjaxDefaultHeader() {
  const token = localStorage.getItem( hxltinh.appConfig.AUTHENTICATION_KEY );
  $.ajaxSetup({
    global: true,
    beforeSend: xhr => {
      xhr.setRequestHeader( hxltinh.appConfig.AUTHENTICATION_KEY, token );
    }
  });
}

export function unSetAjaxDefaultHeader() {
  $.ajaxSetup({
    global: false,
    beforeSend: () => {}
  });
}

export function setGlobalAjaxError() {
  $(document).ajaxError((event, jqxhr) => {
    if(jqxhr.status === 401 || jqxhr.status === 404){
      goToLoginPage();
    }
  });
}

export function checkedIfTokenRemember() {
  const token = localStorage.getItem( hxltinh.appConfig.AUTHENTICATION_KEY );
  return !!token;
}

export function goToLoginPageIfTokenNotRemember() {
  const isRemembered = checkedIfTokenRemember();
  !isRemembered && goToLoginPage();
  return !isRemembered;
}

export function loginAction(email, password) {
  const ttl = 86400;
  return dispatch => {
    dispatch(loginStart());
    return new Promise( ( resolve, reject) => {
      $.ajax({
        url: '/api/login',
        method: 'POST',
        data: {
          email, password, ttl
        },
        dataType: 'json',
        success: function(res){
          dispatch(loginSuccess(res));
          return resolve.apply(this,arguments);
        },
        error: function(err){
          dispatch(loginFailure());
          return reject(err);
        }
      });
    });
  };
}

function loginStart() {
  return {
    type: AUTH_LOGIN_START
  };
}
function loginSuccess(data) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    data
  };
}

function loginFailure(data) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    data
  };
}
