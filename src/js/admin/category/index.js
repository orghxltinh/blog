import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Item from "./category-item";
import Create from "./category-create";

class CategoryHome extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(hxltinh.actions.category._instance.fetchAllData());
  }

  render() {
    const { items } = this.props;
    return (
      <div id="category-home">
        <ul>
        {
          items && items.map( (item) => {
            return (

              <li  key={ item.id }>
                <div>
                  <Link to={`/admin/categories/category/${item.id}`} >{ item.title }</Link>
                </div>
                <div>
                  <button onClick={this.deleteItem.bind(this,item.id)}>Delete</button>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }

  componentDidUpdate() {
    console.log("category home did update");
  }

  deleteItem(id) {
    let { dispatch } = this.props;
    dispatch(hxltinh.actions.category._instance.deleteItem(id));
  }
}

const mapStateToProps = (state) => {
  console.debug('state:', state.category.get("items").toJS());
  return {
    items: state.category.get("items").toJS()
  };
};

const _CategoryHome = connect(mapStateToProps)(CategoryHome);

class Categories extends Component{
  render(){
    return (
      <div id="c-category">
        {this.props.children}
      </div>
    )
  }
}

export default {
  path: 'categories',
  indexRoute: { component: _CategoryHome },
  getChildRoutes(location, cb) {
    cb(null, [
      Create, Item
    ])
  },

  getComponent(location, cb) {
    cb(null, Categories )
  }
}
