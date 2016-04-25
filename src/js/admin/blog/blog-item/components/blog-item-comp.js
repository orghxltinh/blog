import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import { browserHistory } from 'react-router';
import _ from 'lodash';

class AdminBlogItemComp extends Component{

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      textAreaId : "admin-blog-content",
      title: "",
      articleId: null
    };
  }

  componentDidMount(){
    const { dispatch, id } = this.props
    dispatch ( hxltinh.actions.blog._instance.fetchItemIfNeeded(id) );
    dispatch ( hxltinh.actions.article._instance.fetchDataIfNeeded() );
  }

  render() {

    let TextAreaComp = window.hxltinh.globalComponents.TextAreaComp
    let { item, isLoading, articleList } = this.props
    let { articleId, doneGetData } = this.state

    const SelectArticle = articleList.map( (item, key) => {
      return (
        <MenuItem key={ key } value={ item.id } primaryText={ item.id } />
      )
    });

    return (
      <div>
        {
          !isLoading ?
            <form>
              <div>
                <label htmlFor="admin-blog-title">Title</label>
                <input value={ this.state.title || "" } onChange={ this.blogTitleHandle.bind(this) } type="text" id="admin-blog-title" class="admin-blog-title"/>
              </div>
              <div>
                <label htmlFor="admin-blog-content">Title</label>
                <TextAreaComp content={ item.content } textAreaId={ this.state.textAreaId } />
              </div>
              <div>
                <SelectField value={ articleId } onChange={ this.selectHandle.bind(this) }>
                  { SelectArticle }
                </SelectField>
              </div>
              <FlatButton onClick={ this.submitForm.bind(this) } label="Submit" secondary={true} />
            </form>
          :
            <div>is Loading</div>
        }
      </div>
    )
  }

  selectHandle(event, index, value) {
    return this.setState( { articleId : value } )
  }

  blogTitleHandle(e) {
    return this.setState({
       title: e.target.value
     });
  }

  componentWillReceiveProps( nextProp ) {
    return this.setState({
      title: nextProp.item.title,
      articleId: nextProp.item.articleId
    })
  }

  submitForm() {
    const { dispatch, id } = this.props
    const obj = Object.assign({},this.state,{
      id: id,
      title: this.state.title,
      content: encodeURI(tinyMCE.get( this.state.textAreaId ).getContent()),
    })
    dispatch( hxltinh.actions.blog._instance.updateItem(obj) )
  }
}

const mapStateToProps = ( state ) => {

  return {
    item: state.blog.get("singleItem").toJS(),
    isLoading: state.blog.get("isLoading"),
    articleList: state.article.get("items").toJS()
  }
}

export default connect(mapStateToProps)(AdminBlogItemComp)
