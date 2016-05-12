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

    return (
      <header id="header" className="header row">
        {
          !isAdmin ? <MainBlogHeader /> : <AdminBlogHeader />
        }
      </header>
    );
  }
}

export default BlogHeader
