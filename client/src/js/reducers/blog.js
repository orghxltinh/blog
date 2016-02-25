import { combineReducers } from "redux"

let initialState = {
  items: [],
  isLoading: false,
  singleItem: {}
}

const blog = ( state = initialState, action ) => {
  console.log("blog-reducer-action:",action);
  console.log("blog-reducer-state:",state);
  
  switch (action.type){
    case window.actions.blog.GET_BLOG:
      return Object.assign({},state,{
        items: action.items
      })

    case window.actions.blog.GET_ITEM_BLOG:
      return Object.assign({},state,{
        singleItem: action.singleItem
      })

    case window.actions.blog.LOADING_BLOG:
      return Object.assign({},state,{
        isLoading: true
      })

    case window.actions.blog.LOADED_BLOG:
      return Object.assign({},state,{
        isLoading: false
      })

    default:
      return state
  }

}

export default blog
