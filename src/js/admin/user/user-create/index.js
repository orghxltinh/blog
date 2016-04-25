import blogCreate from "./containers/user-create"

export default {
  path: "create",
  getChildRoutes( location, cb){
    cb( null, [])
  },
  getComponent( location, cb){
    cb( null, blogCreate)
  }
}
