import React, { Component } from 'react';
import MainBlogFooter from './main-blog-footer';
import AdminBlogFooter from './admin-blog-footer';

class BlogFooter extends Component{
  render(){
    const { isAdmin } = this.props;
    console.debug('isAdmin:', isAdmin);
    return (
      <footer className="footer row">
        {
          !isAdmin ? <MainBlogFooter /> : <AdminBlogFooter />
        }
      </footer>
    );
  }
}

export default BlogFooter;
