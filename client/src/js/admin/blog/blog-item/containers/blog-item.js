import React, { Component } from "react"
import { connect } from "react-redux"
import Rdom from "react-dom"

class blogItem extends Component{
  componentDidMount(){
    const { dispatch } = this.props
    console.log("--props:", this.props);
    dispatch(actions.blog._instance.fetchItemIfNeeded(this.props.params.id))
  }
  render(){
    console.log("blog item render:",this.props);
    return (
      <div>
        <h3>this is blog item</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("blog-item-to-props:",state);
  return {
    item: state.blog.singleItem,
    isLoading: state.blog.isLoading
  }
}

export default connect(mapStateToProps)(blogItem)
