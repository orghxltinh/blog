import blog from "./blog"
import user from "./user"
import appConfig from "./app-config"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  blog,
  user,
  appConfig
})

export default rootReducer
