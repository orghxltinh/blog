import Admin from './containers/admin';
import User from './user';
import Login from './login';
import Post from './post';
import Category from './category';

export default {
  path: 'admin',
  onEnter: function(){
    // console.log('==== this is admin on enter:', arguments);
  },
  getChildRoutes(location, cb) {
    cb(null, [
      Login, User, Category, Post
    ]);
  },

  getComponent(location, cb) {
    cb(null, Admin);
  }
};
