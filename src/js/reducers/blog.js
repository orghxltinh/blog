import { Map, List, fromJS } from 'immutable'
import * as helpers from './helpers'

let initialState = Map( {
  items: List(),
  isLoading: false,
  createProcessStart: false,
  singleItem: Map(),
  createProcessing: false,
  latest: List()
})

const blog = ( state = initialState, action ) => {
  const blog = window.hxltinh.actions.blog;
  const items = state.get('items').toJS();

  switch (action.type){
    case blog.BLOG_GET:
      return state.set('items', fromJS(action.items));

    case blog.BLOG_GET_ITEM:
      return state.set('singleItem', fromJS( action.singleItem));

    case blog.BLOG_CREATE_START:
      return state.set('createProcessing', true);

    case blog.BLOG_CREATE_SUCCESS:
      return state.set('createProcessing', false);

    case blog.BLOG_GET_LATEST_START:
    case blog.BLOG_LOADING:
      return state.set('isLoading', true);

    case blog.BLOG_LOADED:
      return state.set('isLoading', false);

    case blog.BLOG_GET_LATEST_SUCCESS:
      return state.set('latest', fromJS(action.latest))
                  .set('isLoading', false);

    case blog.BLOG_UPDATE_SUCCESS:
      const uItems = helpers.updateItemList( items, action.updated )
      let _state = state.set( 'items', fromJS( uItems ) )
      return _state.set('singleItem', fromJS(action.updated) )

    default:
      return state
  }

}

export default blog
