import React, {Component} from 'react';

class PostItemView extends Component {
  render() {
    const { post } = this.props;
    console.debug('post:', post);
    return (
      <section className="section post-container">
        <article className="section--article">
          <header><h3>{ post.title }</h3></header>
          <main>{ post.content }</main>
        </article>
      </section>
    );
  }
}

export default PostItemView;
