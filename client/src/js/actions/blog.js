import fetch from "isomorphic-fetch"
import BaseAction from "./baseAction"

export const GET_BLOG = "GET_BLOG"
export const POST_BLOG = "POST_BLOG"
export const GET_ITEM_BLOG = "GET_ITEM_BLOG"
export const LOADING_BLOG = "LOADING_BLOG"
export const LOADED_BLOG = "LOADED_BLOG"

class blogAction extends BaseAction{
  constructor(baseUrl){
    super(baseUrl)
    this.loadingMessage = LOADING_BLOG
    this.loadedMessage = LOADED_BLOG
    this.getDataMessage = GET_BLOG
    this.getItemMessage = GET_ITEM_BLOG
  }

}

export const _instance = new blogAction(window.apiUrl.blogs)
