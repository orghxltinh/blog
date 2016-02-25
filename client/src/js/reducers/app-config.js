import { browserHistory } from "react-router"

console.log("location:",window.location);

let pathName = window.location.pathname;
var regex = /(admin)/;
// var isMatch = pathName.test(regex);
var isAdmin = regex.test(pathName);
console.log("is match:", isAdmin);

const initialState = {
  isAdmin
}
export default function( state = initialState, action ){
  switch (action.type) {
    case window.actions.appConfig.ENTER_ADMIN:
      return Object.assign({}, state, {
        isAdmin: true
      })
    case window.actions.appConfig.LEAVE_ADMIN:
      return Object.assign({}, state, {
        isAdmin: false
      })
    default:
      return state
  }
}
