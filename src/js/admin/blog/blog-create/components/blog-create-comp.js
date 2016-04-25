import React, { Component } from 'react';
import Rdom from 'react-dom';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { browserHistory } from 'react-router';

class BlogCreateComp extends Component{

  constructor(props){
    super(props)
    this.state = {
      title: "",
      content: "",
      textAreaId: 'admin-blog-create',
      articleId: null
    };
    this.props.dispatch(hxltinh.actions.article._instance.fetchDataIfNeeded());
  }

  componentDidMount(){}

  render() {

    const TextAreaComp = window.hxltinh.globalComponents.TextAreaComp;
    const SelectArticle = this.props.articleList.map( (item, key) => {
      return (
        <MenuItem key={ key } value={ item.id } primaryText={ item.title } />
      )
    });

    return (
      <div id="blog-create-comp">
        <label>Title</label>
        <input name="title" type="text" value={ this.state.title } onChange={ this.onChangeTitleHandler.bind(this) } /> <br/>
        <label>Content</label>
        <TextAreaComp textAreaId={ this.state.textAreaId } />
        <SelectField value={ this.state.articleId } onChange={ this.selectHandle.bind(this) }>
          { SelectArticle }
        </SelectField>
        <FlatButton onClick={ this.createBlog.bind(this) } label="Submit" secondary={true} />
      </div>
    );
  }
  onChangeTitleHandler(event) {
    return this.setState({
      title: event.target.value
    });
  }
  onChangeContentHandler(event) {
    return this.setState({
      content: event.target.value
    });
  }
  selectHandle(event, index, value) {
    return this.setState({ articleId : value })
  }
  componentWillReceiveProps(nextProps) {
    return this.setState({
      articleId: nextProps.articleList.length > 0 ? nextProps.articleList[0].id : null
    })
  }
  createBlog(){
    const { title, articleId } = this.state;
    const content = encodeURI(tinyMCE.get( this.state.textAreaId ).getContent());
    this.props.dispatch(hxltinh.actions.blog._instance.createItem({
      title, content, articleId
    }, () => {
      console.log('this:', this);
      browserHistory.push('/admin/blogs');
    }));
  }
}

const mapStateToProp = (state) => {
  console.log('articleList:', state.article.get("items").toJS());
  return {
    articleList: state.article.get('items').toJS(),
    isLoading: state.article.get('isLoading')
  }
}

export default connect(mapStateToProp)(BlogCreateComp)
