import fetch from "isomorphic-fetch"
import BaseAction from "./baseAction"

export const GET_USER = "GET_USER"
export const POST_USER = "POST_USER"
export const GET_ITEM_USER = "GET_ITEM_USER"
export const LOADING_USER = "LOADING_USER"
export const LOADED_USER = "LOADED_USER"

class userAction extends BaseAction{
  constructor(baseUrl){
    super(baseUrl)
    this.loadingMessage = LOADING_USER
    this.loadedMessage = LOADED_USER
    this.getDataMessage = GET_USER
    this.getItemMessage = GET_ITEM_USER
  }

}

export const _instance = new userAction(window.apiUrl.users)
