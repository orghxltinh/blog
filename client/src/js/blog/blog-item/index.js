import BlogItem from "./containers/blog-item"

export default {

  path: ":blogItem",

  getChildRoutes( location, cb) {
    cb(null,[])
  },

  getComponent( location, cb) {
    cb( null, BlogItem)
  }
}
