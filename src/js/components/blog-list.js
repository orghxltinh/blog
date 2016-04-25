import React, { Component } from "react"
import { connect } from "react-redux"

class BlogList extends Component{

  componentDidMount() {

    let { dispatch } = this.props
    dispatch( hxltinh.actions.blog._instance.fetchDataIfNeeded() );
  }
  render() {

    let { items } = this.props

    let List = items.map( (item) => {
      return (
        <div key={item.id}>
          <a href="#" >{ item.title }</a>
        </div>
      )
    })
    return (
      <div id="blog-list">
        { List }
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    items : state.blog.get("items").toJS()
  }
}

export default connect( mapStateToProps )( BlogList )
