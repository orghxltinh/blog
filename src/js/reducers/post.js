import { Map, List, fromJS } from 'immutable';
import * as helpers from './helpers';

let initialState = Map( {
  items: List(),
  isLoading: false,
  createProcessStart: false,
  singleItem: Map(),
  createProcessing: false,
  latest: List(),
  itemsBaseCategory: List(),
  currentItemBaseCategory: List()
});

const post = ( state = initialState, action ) => {
  const post = window.hxltinh.actions.post;
  const items = state.get('items').toJS();

  switch (action.type){
    case post.POST_GET_All:
      return state.set('items', fromJS(action.data));

    case post.POST_GET_ITEM:
      return state.set('singleItem', fromJS( action.data));

    case post.GET_POST_CATEGORY_START:
    case post.POST_GET_LATEST_START:
    case post.POST_LOADING:
      return state.set('isLoading', true);

    case post.POST_CREATE_START:
      return state.set('createProcessing', true);

    case post.GET_POST_CATEGORY_SUCCESS:
      const result = state.get('itemsBaseCategory')
                          .concat(action.data)
                          .groupBy(item => item.id)
                          .valueSeq().flatten()
                          .sortBy(item => item.updatedDate).reverse();
      return state.withMutations(state => {
        state.set('itemsBaseCategory', result);
        state.set('currentItemBaseCategory', fromJS(action.data));
        state.set('isLoading', false);

      });

    case post.POST_CREATE_SUCCESS:
      return state.set('createProcessing', false);

    case post.POST_LOADED:
      return state.set('isLoading', false);

    case post.POST_GET_LATEST_SUCCESS:
      return state.set('latest', fromJS(action.data))
                  .set('isLoading', false);

    case post.POST_UPDATE_SUCCESS:
      const uItems = helpers.updateItemList(items, action.updated);
      let _state = state.set('items', fromJS( uItems ));
      return _state.set('singleItem', fromJS(action.updated) );

    default:
      return state;
  }
};

export default post;
