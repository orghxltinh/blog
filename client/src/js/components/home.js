import React, { Component } from "react"

import BlogList from "./blog-list"

class HomePage extends Component{
  render(){
    return (
      <div id="home-page" className="row">
        <div className="small-12 medium-8 large-8 columns">
          <BlogList />
          
        </div>
        <div className="small-12 medium-4 large-4 columns">
          <h4>article here</h4>
        </div>

      </div>
    )
  }
}

export default HomePage
