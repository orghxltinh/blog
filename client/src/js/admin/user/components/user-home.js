import React, { Component } from "react"
import { connect } from "react-redux"

class UserHome extends Component{

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(actions.user._instance.fetchDataIfNeeded());
  }

  render() {
    console.log("user home props", this.props);
    return (
      <div id="user-home">
        <h3> this is user home </h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("user mapStateToProps:",state);
  return {
    items: state.user.items,
  }
}
export default connect(mapStateToProps)(UserHome)
