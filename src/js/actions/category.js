import BaseAction from './baseAction';

export const CATEGORY_GET_ALL = 'CATEGORY_GET_ALL';
export const CATEGORY_POST = 'CATEGORY_POST';
export const CATEGORY_GET_ITEM = 'CATEGORY_GET_ITEM';
export const CATEGORY_LOADING = 'CATEGORY_LOADING';
export const CATEGORY_LOADED = 'CATEGORY_LOADED';

export const CATEGORY_CREATE_START = 'CATEGORY_CREATE_START';
export const CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS';
export const CATEGORY_CREATE_FAILURE = 'CATEGORY_CREATE_FAILURE';

export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAILURE = 'CATEGORY_DELETE_FAILURE';

export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS';
export const CATEGORY_UPDATE_FAILURE = 'CATEGORY_UPDATE_FAILURE';

export const CATEGORY_GET_LATEST_START = 'CATEGORY_GET_LATEST_START';
export const CATEGORY_GET_LATEST_SUCCESS = 'CATEGORY_GET_LATEST_SUCCESS';
export const CATEGORY_GET_LATEST_FAILURE = 'CATEGORY_GET_LATEST_FAILURE';

class categoryAction extends BaseAction{
  constructor(baseUrl,name){
    super(baseUrl,name);
    this.loadingMessage = CATEGORY_LOADING;
    this.loadedMessage = CATEGORY_LOADED;
    this.getDataMessage = CATEGORY_GET_ALL;
    this.getItemMessage = CATEGORY_GET_ITEM;

    // Start: overiding base attribute
    this.createItemStartMessage = CATEGORY_CREATE_START;
    this.createItemSuccessMessage = CATEGORY_CREATE_SUCCESS;
    this.createItemFalureMessage = CATEGORY_CREATE_FAILURE;

    this.deleteItemSuccessMesage = CATEGORY_DELETE_SUCCESS;
    this.deleteItemFalureMessage = CATEGORY_DELETE_FAILURE;

    this.updateItemSuccessMesage = CATEGORY_UPDATE_SUCCESS;
    this.updateItemFalureMessage = CATEGORY_UPDATE_FAILURE;
    // End: overiding base attribute

  }
}

export const _instance = new categoryAction(window.hxltinh.apiUrl.category,'category');
