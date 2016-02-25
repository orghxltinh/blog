import Admin from "./containers/admin"
import Blog from "./blog"
import User from "./user"
import Login from "./login"

export default {
  path: 'admin',
  onEnter: function(){
    console.log("==== this is admin on enter:", arguments);
  },
  getChildRoutes(location, cb) {
    cb(null, [
      Blog, Login, User
    ])
  },

  getComponent(location, cb) {
    cb(null, Admin )
  }
}
