import blogItem from "./containers/blog-item"


export default {
  path: 'blog/:id',

  getChildRoutes(location, cb) {
    cb(null, [
    ])
  },

  getComponent(location, cb) {
    cb(null, blogItem )
  }
}
