import { Map, fromJS } from 'immutable';
import _ from 'lodash';

const initialState = Map({
  auth: Map(),
  isLogin: true,
  isLoading: false
});

const reducer = (state = initialState, action) => {
  const auth = hxltinh.actions.auth;
  switch(action.type) {

  case auth.AUTH_LOGIN_START:
    return state.set('isLoading', true);

  case auth.AUTH_LOGIN_SUCCESS:
    return state.withMutations(state => {
      state.set('auth', fromJS(action.data));
      state.set('isLogin', true);
      state.set('isLoading', false);
    });
  case auth.AUTH_LOGIN_FAILURE:
    return state.set('isLogin', false);

  case auth.USER_ALL_SESSIONS: {
    // check latest session still alive or not
    const sortSessions = _.sortBy(action.data, item => new Date(item.created));
    const latestSession = sortSessions[sortSessions.length - 1];
    const timeNow = moment();
    const timeToLive = moment(latestSession.created).add(latestSession.ttl, 'seconds');
    if(timeNow.isBefore(timeToLive)) {
      return state.set('isLogin', true);
    }
    auth.forgetAuth();
    return state.set('isLogin', false);
  }

  case auth.USER_DONT_HAVE_SESSION_OR_ERROR:
    return state.set('isLogin', false);

  default:
    return state;
  }
};

export default reducer;
