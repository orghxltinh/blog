import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import { browserHistory } from 'react-router';
import _ from 'lodash';

class AdminPostItemComp extends Component{

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      textAreaId : "admin-post-content",
      title: "",
      categoryId: null
    };
  }

  componentDidMount(){
    const { dispatch, id } = this.props
    dispatch (hxltinh.actions.post._instance.fetchItemIfNeeded(id));
    dispatch (hxltinh.actions.category._instance.fetchDataIfNeeded());
  }

  render() {

    let TextAreaComp = window.hxltinh.globalComponents.TextAreaComp
    let { item, isLoading, categoryList } = this.props
    let { categoryId, doneGetData } = this.state

    const SelectArticle = categoryList.map( (item, key) => {
      return (
        <MenuItem key={ key } value={ item.id } primaryText={ item.title } />
      )
    });
    console.debug('item:', item);
    return (
      <div>
        {
          !isLoading ?
            <form>
              <div>
                <label htmlFor="admin-post-title">Title</label>
                <input value={ this.state.title || "" } onChange={ this.postTitleHandle.bind(this) } type="text" id="admin-post-title" class="admin-post-title"/>
              </div>
              <div>
                <label htmlFor="admin-post-content">Title</label>
                { item.content && <TextAreaComp content={ item.content } textAreaId={ this.state.textAreaId } /> }
              </div>
              <div>
                <SelectField value={ categoryId } onChange={ this.selectHandle.bind(this) }>
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
    return this.setState( { categoryId : value } )
  }

  postTitleHandle(e) {
    return this.setState({
       title: e.target.value
     });
  }

  componentWillReceiveProps( nextProp ) {
    return this.setState({
      title: nextProp.item.title,
      categoryId: nextProp.item.categoryId
    })
  }

  submitForm() {
    const { dispatch, id } = this.props
    const obj = Object.assign({},this.state,{
      id: id,
      title: this.state.title,
      content: encodeURI(tinyMCE.get( this.state.textAreaId ).getContent()),
    })
    dispatch( hxltinh.actions.post._instance.updateItem(obj) )
  }
}

const mapStateToProps = ( state ) => {

  return {
    item: state.post.get("singleItem").toJS(),
    isLoading: state.post.get("isLoading"),
    categoryList: state.category.get("items").toJS()
  }
}

export default connect(mapStateToProps)(AdminPostItemComp)
