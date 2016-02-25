import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux'
import Rdom from "react-dom"
import { Link } from "react-router"
import { browserHistory } from "react-router"

class Blog extends baseClass.RouteComponent{

  constructor(props){
    super(props)

  }

  componentWillMount(){

  }

  componentWillUnmount(){

  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(actions.blog._instance.fetchDataIfNeeded());
  }

  render(){
    let { items, isLoading } = this.props

    let itemList = items.map( (item) => {
      return (
        <li key={item.id}>

          <Link to={`/admin/blogs/blog/${item.id}`} > {item.title} </Link>
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

}

Blog.propTypes = {
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {

  return {
    items: state.blog.items,
    isLoading: state.blog.isLoading
  }
}


export default connect(mapStateToProps)(Blog)
