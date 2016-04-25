import fetch from "isomorphic-fetch"
import BaseAction from "./baseAction"

export const USER_GET = "USER_GET"
export const USER_POST = "USER_POST"
export const USER_GET_ITEM = "USER_GET_ITEM"
export const USER_LOADING = "USER_LOADING"
export const USER_LOADED = "USER_LOADED"

class userAction extends BaseAction{
  constructor( baseUrl, name ){
    super( baseUrl, name )
    this.loadingMessage = USER_LOADING
    this.loadedMessage = USER_LOADED
    this.getDataMessage = USER_GET
    this.getItemMessage = USER_GET_ITEM
  }

}

export const _instance = new userAction( window.hxltinh.apiUrl.users, "user")
