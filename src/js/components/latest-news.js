import React, { Component } from 'react';
import { connect } from 'react-redux';

class LatestNew extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(hxltinh.actions.blog._instance.getLatest());
  }
  render() {
    const { isLoading, latest } = this.props;
    let firstBlog = latest[0] || null;
    return (
      <section className='row latest-news'>
      {
        !isLoading && firstBlog ?
          <div>
            <article><h3>{ firstBlog.title } <small>3/6/2015</small></h3></article>
            <main><p>{ firstBlog.content }</p></main>
            <div class="callout">
              <ul class="menu simple">
                <li><a href="#">Author: Mike Mikers</a></li>
                <li><a href="#">Comments: 3</a></li>
              </ul>
            </div>
          </div>

        :
          <div>Loading</div>
      }
      </section>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    isLoading: state.blog.get('isLoading'),
    latest: state.blog.get('latest').toJS()
  };
}

export default connect(mapStateToProps)(LatestNew);
