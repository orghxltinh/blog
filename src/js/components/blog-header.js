import React, { Component } from 'react';
import MainBlogHeader from './main-blog-header';
import AdminBlogHeader from './admin-blog-header';

class BlogHeader extends Component{
  render(){

    let { isAdmin, categories } = this.props;
    // return (
    //   <div id='blog-header' className='row'>
    //   {
    //     isAdmin ?
    //       <h3> this is admin blog header </h3>
    //       :
    //       <MainBlogHeader />
    //   }
    //   </div>
    // )
    if (isAdmin) {
      return (
        <AdminBlogHeader />
      )
    } else {
      return (
        <MainBlogHeader />
      )
    }
  }
}

export default BlogHeader
