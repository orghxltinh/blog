import React, { Component } from "react"
import { connect } from "react-redux"

class ArticleCreateComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: ""
    }
    this.handleDescriptionInput = (description) => this.setState( { description } );
  }

  componentDidMount() {
    tinymce.init({
      selector: "textArea.descriptions",
      height: 200,
      theme: 'modern',
    })
  }

  render() {
    let { title, dscState } = this.state

    return (
      <div>
        <div>Title</div>
        <input id="title" name="title" type="text" value={ title } onChange={ this.handleTitleInput.bind(this) } />
        <br/>
        <div>Description</div>
        <textArea className="descriptions" id="description-input" />
        <br/>

        <br/>
        <button type="button" className="button" onClick={ this.Create.bind(this) } >Create</button>
      </div>
    )
  }

  handleTitleInput(e) {
    return this.setState( { title : e.target.value } )
  }

  // handleDescriptionInput( dscState ) {
  //   this.setState( { dscState } )
  // }

  Create() {
    // console.log( "active editor content", tinyMCE.get("description-input") );
    // console.log( "active editor content", tinyMCE.get()[0].getContent() );
    let { dispatch } = this.props

    dispatch( hxltinh.actions.article._instance.createItem({
      title: this.state.title,
      description:  encodeURI( tinyMCE.get("description-input").getContent( { format: "raw" } ) ),
      slug: "some_slug"
    }))
  }

}

export default connect()(ArticleCreateComp)
