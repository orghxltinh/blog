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
    case window.actions.user.GET_USER:
      return Object.assign({},state,{
        items: action.items
      })

    case window.actions.user.GET_ITEM_USER:
      return Object.assign({},state,{
        singleItem: action.singleItem
      })

    case window.actions.user.LOADING_USER:
      return Object.assign({},state,{
        isLoading: true
      })

    case window.actions.user.LOADED_USER:
      return Object.assign({},state,{
        isLoading: false
      })

    default:
      return state
  }

}

export default user
