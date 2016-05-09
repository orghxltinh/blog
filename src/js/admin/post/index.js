import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rdom from 'react-dom';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Item from './post-item';
import Create from './post-create';

class Post extends baseClass.RouteComponent{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(hxltinh.actions.post._instance.fetchAllData());
  }

  render(){
    let { items, isLoading } = this.props

    let itemList = items.map( (item) => {
      return (
        <li key={item.id}>
          <Link to={`/admin/posts/post/${item.id}`} > {item.title} </Link>
          <button onClick={this.handleDelete.bind(this, item.id)}>Delete</button>
        </li>
      )
    })
    return (
      <div id='post'>
        <ul>
        {itemList}
        </ul>
      </div>
    )
  }

  handleDelete(id) {
    this.props.dispatch(hxltinh.actions.post._instance.deleteItem(id)).then(res=> {
    });
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    items: state.post.get('items').toJS(),
    isLoading: state.post.get('isLoading')
  }
}


const AdminPost = connect(mapStateToProps)(Post)

class Posts extends Component{
  render(){
    return (
      <div id='posts'>
        {this.props.children}
      </div>
    )
  }
}

export default {
  path: 'posts',
  indexRoute: { component: AdminPost },
  getChildRoutes(location, cb) {
    cb(null, [
      Item, Create
    ])
  },

  getComponent(location, cb) {
    cb(null, Posts )
  }
}
