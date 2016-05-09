import React, { Component } from 'react';
import { connect } from 'react-redux';

class Category extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props;
    this.fetchData(params.id);
  }

  componentWillUpdate(nextProps, nextState) {
    const { params } = nextProps;
    if (params.id !== this.currentCateId) {
      this.fetchData(params.id);
    }
  }

  render() {
    const { items, isLoading } = this.props;
    const { PostItemView } = hxltinh.globalComponents;

    return (
      <div className="row">
      {
        !isLoading ?
          items.length === 0 ? <div>Please, create post for this category</div> : <PostItemView post={items[0]}></PostItemView>
        :
          <div>Loading</div>
      }
      </div>
    );
  }

  fetchData(cateId) {
    const { dispatch } = this.props;
    dispatch(hxltinh.actions.post._instance.getPostBaseCategory(cateId));
    this.currentCateId = cateId;
  }

}

const mapStateToProps = (state) => {

  return {
    items: state.post.get('currentItemBaseCategory').toJS(),
    isLoading: state.post.get('isLoading')
  };
};

const _Category = connect(mapStateToProps)(Category);

export default {
  path: 'category/:id',
  getComponent(location, cb) {
    return cb(null, _Category);
  }
}
