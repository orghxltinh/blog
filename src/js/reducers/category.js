import { Map, List, fromJS } from 'immutable';
import * as helpers from './helpers';

const initialState = Map ({
  items: List(),
  isLoading: false,
  singleItem: Map()
});

const reducer = (state = initialState, action) => {
  const items = state.get('items').toJS();
  switch (action.type){
    case window.hxltinh.actions.category.CATEGORY_GET_ALL:
      return state.set('items', fromJS(action.data));

    case window.hxltinh.actions.category.CATEGORY_GET_ITEM:
      return state.set('singleItem', fromJS( action.data));

    case window.hxltinh.actions.category.CATEGORY_LOADING:
      return state.set('isLoading', true);

    case window.hxltinh.actions.category.CATEGORY_LOADED:
      return state.set('isLoading', false);

    case window.hxltinh.actions.category.CATEGORY_DELETE_SUCCESS:
      items.filter ( item => {
        item.id !== action.deletedId
      });
      return state.set('items', fromJS (items));

    case window.hxltinh.actions.category.CATEGORY_UPDATE_SUCCESS:
      const uItems = helpers.updateItemList(items, action.updated);
      let _state = state.set('items', fromJS(Items));
      return _state.set('singleItem', fromJS(action.updated));

    default:
      return state;
  }
}

export default reducer
