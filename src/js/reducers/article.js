import { Map, List, fromJS } from "immutable"
import * as helpers from './helpers'

const initialState = Map ({
  items: List(),
  isLoading: false,
  singleItem: Map()
})

initialState.set("isLoading",true);

console.log("initialState:",initialState);

const reducer = ( state = initialState, action ) => {
  // console.log("blog-reducer-action:",action);
  // console.log("blog-reducer-state:",state);

  const items = state.get("items").toJS();

  switch (action.type){
    case window.hxltinh.actions.article.ARTICLE_GET:
      return state.set( "items", fromJS( action.items ) )

    case window.hxltinh.actions.article.ARTICLE_GET_ITEM:
      return state.set( "singleItem", fromJS( action.singleItem ) )

    case window.hxltinh.actions.article.ARTICLE_LOADING:
      return state.set("isLoading", true)

    case window.hxltinh.actions.article.ARTICLE_LOADED:
      return state.set("isLoading", false)

    case window.hxltinh.actions.article.ARTICLE_DELETE_SUCCESS:
      items.filter ( item => {
        item.id !== action.deletedId
      })
      return state.set("items", fromJS (items ))

    case window.hxltinh.actions.article.ARTICLE_UPDATE_SUCCESS:
      const uItems = helpers.updateItemList( items, action.updated )
      let _state = state.set( "items", fromJS( uItems ) )
      return _state.set("singleItem", fromJS(action.updated) )

    default:
      return state
  }

}

export default reducer
