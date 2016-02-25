import Home from "./containers/blog"
import BlogIndex from "./containers/blog-index"
import BlogItem from "./blog-item"

export default {

  path: "blog",
  indexRoute: { component: BlogIndex },
  getChildRoutes( location, cb) {
    cb( null, [ BlogItem, BlogIndex ])
  },

  getComponent( location, cb) {
    cb( null, Home)
  }
}
