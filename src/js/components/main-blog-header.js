import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class MainBlogHeader extends Component{
  constructor(props) {
    super(props);
    this.props.dispatch(hxltinh.actions.category._instance.fetchDataIfNeeded());
  }
  render() {
    const { isLoading, categories } = this.props;
    return (
      !isLoading ?
        categories.length > 0 ?
          <header id='main-blog-header' className="b-header row">
            <div className='b-top-bar' id='top-menu'>
              <div className='top-bar-left'>

                <ul className='dropdown menu' data-dropdown-menu='8kbmai-dropdown-menu' role='menubar'>
                  <li id="logo" className='menu-text' role='menuitem'>
                    <Link to="/">Tĩnh Hà Xuân Long blog</Link>
                  </li>
                  {
                    categories.map(item => {
                      return (
                        <li key={item.id}>
                          <Link to={`/category/${item.id}`}>{ item.title }</Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

          </header>
        :
            <div>Loading</div>
      :
        <div>Loading</div>
    )
  }
}

const mapStateToProp = (state) => {
  return {
    isLoading: state.category.get('isLoading'),
    categories: state.category.get('items').toJS()
  }
};

export default connect(mapStateToProp)(MainBlogHeader);
