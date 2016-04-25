import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux'
import Rdom from "react-dom"
import { Link } from "react-router"
import { browserHistory } from "react-router"

import Item from "./blog-item"
import Create from "./blog-create"

class Blog extends baseClass.RouteComponent{

  constructor(props){
    super(props)
    this.printX();
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(hxltinh.actions.blog._instance.fetchDataIfNeeded());
  }

  render(){
    let { items, isLoading } = this.props

    let itemList = items.map( (item) => {
      return (
        <li key={item.id}>
          <Link to={`/admin/blogs/blog/${item.id}`} > {item.title} </Link>
          <button onClick={this.handleDelete.bind(this, item.id)}>Delete</button>
        </li>
      )
    })
    return (
      <div id="blog">
        <ul>
        {itemList}
        </ul>
      </div>
    )
  }

  handleDelete(id) {
    this.props.dispatch(hxltinh.actions.blog._instance.deleteItem(id)).then(res=> {
      console.log('-- it should work:', res);
    });
  }
}

Blog.propTypes = {
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {

  return {
    items: state.blog.get("items").toJS(),
    isLoading: state.blog.get("isLoading")
  }
}


const AdminBlog = connect(mapStateToProps)(Blog)

class Blogs extends Component{
  render(){
    return (
      <div id="blogs">
        {this.props.children}
      </div>
    )
  }
}

export default {
  path: 'blogs',
  indexRoute: { component: AdminBlog },
  getChildRoutes(location, cb) {
    cb(null, [
      Item, Create
    ])
  },

  getComponent(location, cb) {
    cb(null, Blogs )
  }
}
