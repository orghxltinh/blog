import React, { Component } from "react"

class TextAreaComp extends Component {

  componentDidMount() {
    tinymce.init({
      selector: "textArea.rich-text-editor",
      height: 200,
      theme: 'modern',
      setup: ed => {
        ed.on("init", ()=> tinyMCE.get( this.props.textAreaId ).setContent(decodeURI(this.props.content || '')) )
      }
    })
  }

  componentWillUnmount() {
    tinymce.remove("textArea.rich-text-editor")
  }

  render() {

    return (
      <div className="text-area-tinymce">
        <textArea className="rich-text-editor" id={this.props.textAreaId} />
      </div>
    )
  }
}

export default TextAreaComp
