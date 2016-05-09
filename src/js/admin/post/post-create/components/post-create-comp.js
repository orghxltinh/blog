import React, { Component } from 'react';
import Rdom from 'react-dom';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { browserHistory } from 'react-router';

class PostCreateComp extends Component{

  constructor(props){
    super(props)
    this.state = {
      title: "",
      content: "",
      textAreaId: 'admin-post-create',
      categoryId: null
    };
    this.props.dispatch(hxltinh.actions.category._instance.fetchDataIfNeeded());
  }

  componentDidMount(){}

  render() {

    const TextAreaComp = window.hxltinh.globalComponents.TextAreaComp;
    const SelectArticle = this.props.categoryList.map( (item, key) => {
      return (
        <MenuItem key={ key } value={ item.id } primaryText={ item.title } />
      )
    });

    return (
      <div id="post-create-comp">
        <label>Title</label>
        <input name="title" type="text" value={ this.state.title } onChange={ this.onChangeTitleHandler.bind(this) } /> <br/>
        <label>Content</label>
        <TextAreaComp textAreaId={ this.state.textAreaId } />
        <SelectField value={ this.state.categoryId } onChange={ this.selectHandle.bind(this) }>
          { SelectArticle }
        </SelectField>
        <FlatButton onClick={ this.createPost.bind(this) } label="Submit" secondary={true} />
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
    return this.setState({ categoryId : value })
  }
  componentWillReceiveProps(nextProps) {
    return this.setState({
      categoryId: nextProps.categoryList.length > 0 ? nextProps.categoryList[0].id : null
    })
  }
  createPost(){
    const { title, categoryId } = this.state;
    const content = encodeURI(tinyMCE.get( this.state.textAreaId ).getContent());
    this.props.dispatch(hxltinh.actions.post._instance.createItem({
      title, content, categoryId
    }, () => {
      console.log('this:', this);
      browserHistory.push('/admin/posts');
    }));
  }
}

const mapStateToProp = (state) => {
  console.log('categoryList:', state.category.get("items").toJS());
  return {
    categoryList: state.category.get('items').toJS(),
    isLoading: state.category.get('isLoading')
  }
}

export default connect(mapStateToProp)(PostCreateComp)
