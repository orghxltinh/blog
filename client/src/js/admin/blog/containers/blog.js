import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux'
import Rdom from "react-dom"
import { Link } from "react-router"

class Blog extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let { items } = this.props


    let itemList = items.map( (item) => {
      return (
        <li key={item.id}>

          <Link to={`admin/blog/${item.id}`} > {item.title} </Link>
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
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(actions.blog._instance.fetchDataIfNeeded());
  }
}

Blog.propTypes = {
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  
  return {
    items: state.blog.items
  }
}

console.log("mapStateToProps:",mapStateToProps);




export default connect(mapStateToProps)(Blog)

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Blog)
