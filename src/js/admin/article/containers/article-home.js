import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ArticleHome extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(hxltinh.actions.article._instance.fetchDataIfNeeded());
  }

  render() {
    const { items } = this.props;
    return (
      <div id="article-home">
        <ul>
        {
          items && items.map( (item) => {
            return (

              <li  key={ item.id }>
                <div>
                  <Link to={`/admin/articles/article/${item.id}`} >{ item.title }</Link>
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
    console.log("article home did update")

  }

  deleteItem(id) {
    let { dispatch } = this.props
    dispatch(hxltinh.actions.article._instance.deleteItem(id));
  }
}

const mapStateToProps = (state) => {


  return {
    items: state.article.get("items").toJS()
  }
}

export default connect( mapStateToProps )( ArticleHome )
