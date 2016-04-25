import fetch from 'isomorphic-fetch';
import BaseAction from './baseAction';

export const BLOG_GET = 'BLOG_GET';
export const BLOG_POST = 'BLOG_POST';
export const BLOG_GET_ITEM = 'BLOG_GET_ITEM';
export const BLOG_LOADING = 'BLOG_LOADING';
export const BLOG_LOADED = 'BLOG_LOADED';

export const BLOG_CREATE_START = 'BLOG_CREATE_START';
export const BLOG_CREATE_SUCCESS = 'BLOG_CREATE_SUCCESS';
export const BLOG_CREATE_FAILURE = 'BLOG_CREATE_FAILURE';

export const BLOG_DELETE_SUCCESS = 'BLOG_DELETE_SUCCESS';
export const BLOG_DELETE_FAILURE = 'BLOG_DELETE_FAILURE';

export const BLOG_UPDATE_SUCCESS = 'BLOG_UPDATE_SUCCESS';
export const BLOG_UPDATE_FAILURE = 'BLOG_UPDATE_FAILURE';

export const BLOG_GET_LATEST_START = 'BLOG_GET_LATEST_START';
export const BLOG_GET_LATEST_SUCCESS = 'BLOG_GET_LATEST_SUCCESS';
export const BLOG_GET_LATEST_FAILURE = 'BLOG_GET_LATEST_FAILURE';

class blogAction extends BaseAction{
  constructor(baseUrl,name){
    super(baseUrl,name);
    this.loadingMessage = BLOG_LOADING;
    this.loadedMessage = BLOG_LOADED;
    this.getDataMessage = BLOG_GET;
    this.getItemMessage = BLOG_GET_ITEM;

    // Start: overiding base attribute
    this.createItemStartMessage = BLOG_CREATE_START;
    this.createItemSuccessMessage = BLOG_CREATE_SUCCESS;
    this.createItemFalureMessage = BLOG_CREATE_FAILURE;

    this.deleteItemSuccessMesage = BLOG_DELETE_SUCCESS;
    this.deleteItemFalureMessage = BLOG_DELETE_FAILURE;

    this.updateItemSuccessMesage = BLOG_UPDATE_SUCCESS;
    this.updateItemFalureMessage = BLOG_UPDATE_FAILURE;
    // End: overiding base attribute

  }

  getLatest() {
    return dispatch => {
      dispatch(this.getLatestStart());
      $.ajax({
        url: `${this.apiUrl}/latest`, method: 'GET', dataType: 'JSON',
        success: res => {
          dispatch(this.getLatestSucess(res));
        },
        error: err => {
          dispatch(this.getLatestFaulure());
        }
      })
    }
  }

  getLatestStart() {
    return {
      type: BLOG_GET_LATEST_START
    }
  }

  getLatestSucess(latest) {
    return {
      type: BLOG_GET_LATEST_SUCCESS,
      latest
    }
  }

  getLatestFailure() {
    return {
      type: BLOG_GET_LATEST_FAILURE
    }
  }

}

export const _instance = new blogAction(window.hxltinh.apiUrl.blogs,'blog');
