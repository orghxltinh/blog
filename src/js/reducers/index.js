import blog from "./blog"
import user from "./user"
import article from "./article"
import appConfig from "./app-config"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  blog,
  user,
  article,
  appConfig
})

export default rootReducer
