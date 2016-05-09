import React, { Component } from 'react';
import { connect } from 'react-redux';

class LatestNew extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(hxltinh.actions.post._instance.getLatest());
  }
  render() {
    const { isLoading, latest } = this.props;
    let firstPost = latest[0] || null;
    return (
      <section className='b-section row latest-news'>
      {
        !isLoading && firstPost ?
          <article>
            <header><h3>{ firstPost.title } <small>3/6/2015</small></h3></header>
            <main><p>{ firstPost.content }</p></main>
            <div class="callout">
              <ul class="menu simple">
                <li><a href="#">Author: Mike Mikers</a></li>
                <li><a href="#">Comments: 3</a></li>
              </ul>
            </div>
          </article>

        :
          <div>Loading</div>
      }
      </section>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    isLoading: state.post.get('isLoading'),
    latest: state.post.get('latest').toJS()
  };
};

export default connect(mapStateToProps)(LatestNew);
