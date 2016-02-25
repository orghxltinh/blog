import Blog from "./containers/blog"


export default {
  path: 'home',

  getChildRoutes(location, cb) {
    cb(null, [
    ])
  },

  getComponent(location, cb) {
    cb(null, Blog )
  }
}
