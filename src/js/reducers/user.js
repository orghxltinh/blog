import { combineReducers } from "redux"

let initialState = {
  items: [],
  isLoading: false,
  singleItem: {}
}

const user = ( state = initialState, action ) => {
  // console.log("user-reducer-action:",action);
  // console.log("user-reducer-state:",state);
  switch (action.type){
    case window.hxltinh.actions.user.USER_GET:
      return Object.assign({},state,{
        items: action.items
      })

    case window.hxltinh.actions.user.USER_GET_ITEM:
      return Object.assign({},state,{
        singleItem: action.singleItem
      })

    case window.hxltinh.actions.user.USER_LOADING:
      return Object.assign({},state,{
        isLoading: true
      })

    case window.hxltinh.actions.user.USER_LOADED:
      return Object.assign({},state,{
        isLoading: false
      })

    default:
      return state
  }

}

export default user
