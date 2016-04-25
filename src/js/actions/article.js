import fetch from "isomorphic-fetch"
import BaseAction from "./baseAction"

export const ARTICLE_GET = "ARTICLE_GET"
export const ARTICLE_POST = "ARTICLE_POST"
export const ARTICLE_GET_ITEM = "ARTICLE_GET_ITEM"
export const ARTICLE_LOADING = "ARTICLE_LOADING"
export const ARTICLE_LOADED = "ARTICLE_LOADED"
export const ARTICLE_CREATE_SUCCESS = "ARTICLE_CREATE_SUCCESS"
export const ARTICLE_CREATE_FAILURE = "ARTICLE_CREATE_FAILURE"
export const ARTICLE_DELETE_SUCCESS = "ARTICLE_DELETE_SUCCESS"
export const ARTICLE_DELETE_FAILURE = "ARTICLE_DELETE_FAILURE"
export const ARTICLE_UPDATE_SUCCESS = "ARTICLE_UPDATE_SUCCESS"
export const ARTICLE_UPDATE_FAILURE = "ARTICLE_UPDATE_FAILURE"

class articleAction extends BaseAction{
  constructor( baseUrl, name ){
    super( baseUrl, name )

    this.loadingMessage = ARTICLE_LOADING
    this.loadedMessage = ARTICLE_LOADED
    this.getDataMessage = ARTICLE_GET
    this.getItemMessage = ARTICLE_GET_ITEM

    this.createItemSuccessMesage = ARTICLE_CREATE_SUCCESS
    this.createItemFalureMessage = ARTICLE_CREATE_FAILURE

    this.deleteItemSuccessMesage = ARTICLE_DELETE_SUCCESS
    this.deleteItemFalureMessage = ARTICLE_DELETE_FAILURE

    this.updateItemSuccessMesage = ARTICLE_UPDATE_SUCCESS
    this.updateItemFalureMessage = ARTICLE_UPDATE_FAILURE
  }

}

export const _instance = new articleAction( window.hxltinh.apiUrl.articles, "article" )
