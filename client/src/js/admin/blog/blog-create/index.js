import blogCreate from "./containers/blog-create"

export default {
  path: "create",
  getChildRoutes( location, cb){
    cb( null, [])
  },
  getComponent( location, cb){
    cb( null, blogCreate)
  }
}
