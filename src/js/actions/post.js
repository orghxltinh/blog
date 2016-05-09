import BaseAction from './baseAction';

export const POST_GET_All = 'POST_GET_All';
export const POST_POST = 'POST_POST';
export const POST_GET_ITEM = 'POST_GET_ITEM';
export const POST_LOADING = 'POST_LOADING';
export const POST_LOADED = 'POST_LOADED';

export const POST_CREATE_START = 'POST_CREATE_START';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_FAILURE = 'POST_CREATE_FAILURE';

export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';

export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
export const POST_UPDATE_FAILURE = 'POST_UPDATE_FAILURE';

export const POST_GET_LATEST_START = 'POST_GET_LATEST_START';
export const POST_GET_LATEST_SUCCESS = 'POST_GET_LATEST_SUCCESS';
export const POST_GET_LATEST_FAILURE = 'POST_GET_LATEST_FAILURE';

export const GET_POST_CATEGORY_START = 'GET_POST_CATEGORY_START';
export const GET_POST_CATEGORY_SUCCESS = 'GET_POST_CATEGORY_SUCCESS';
export const GET_POST_CATEGORY_FAILURE = 'GET_POST_CATEGORY_FAILURE';

class postAction extends BaseAction{
  constructor(baseUrl,name){
    super(baseUrl,name);
    this.loadingMessage = POST_LOADING;
    this.loadedMessage = POST_LOADED;
    this.getDataMessage = POST_GET_All;
    this.getItemMessage = POST_GET_ITEM;

    // Start: overiding base attribute
    this.createItemStartMessage = POST_CREATE_START;
    this.createItemSuccessMessage = POST_CREATE_SUCCESS;
    this.createItemFalureMessage = POST_CREATE_FAILURE;

    this.deleteItemSuccessMesage = POST_DELETE_SUCCESS;
    this.deleteItemFalureMessage = POST_DELETE_FAILURE;

    this.updateItemSuccessMesage = POST_UPDATE_SUCCESS;
    this.updateItemFalureMessage = POST_UPDATE_FAILURE;
    // End: overiding base attribute

  }

  getPostBaseCategory(categoryId) {
    return dispatch => {
      dispatch(this.sendOneMessage(GET_POST_CATEGORY_START));
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `${hxltinh.apiUrl.category}/${categoryId}/posts`, method: 'GET', dataType: 'JSON',
          success: res => {
            dispatch(this.sendOneMessageWithObject(GET_POST_CATEGORY_SUCCESS, res));
            resolve(res);
          },
          error: err => {
            dispatch(this.sendOneMessageWithObject(GET_POST_CATEGORY_FAILURE, err));
            reject(err);
          }
        });
      });
    };
  }

  getLatest() {
    return dispatch => {
      dispatch(this.sendOneMessage(POST_GET_LATEST_START));
      $.ajax({
        url: `${this.apiUrl}/latest`, method: 'GET', dataType: 'JSON',
        success: res => {
          dispatch(this.sendOneMessageWithObject(POST_GET_LATEST_SUCCESS, res));
        },
        error: err => {
          dispatch(this.sendOneMessageWithObject(POST_GET_LATEST_FAILURE, err));
        }
      });
    };
  }

  getLatestStart() {
    return {
      type: POST_GET_LATEST_START
    };
  }

  getLatestSucess(latest) {
    return {
      type: POST_GET_LATEST_SUCCESS,
      latest
    };
  }

  getLatestFailure() {
    return {
      type: POST_GET_LATEST_FAILURE
    };
  }

}

export const _instance = new postAction(window.hxltinh.apiUrl.post,'post');
