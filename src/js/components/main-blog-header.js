import React, { Component } from "react"

class MainBlogHeader extends Component{
  render() {
    return (
      <div id="main-blog-content">

        <div className="top-bar" id="example-menu">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu="8kbmai-dropdown-menu" role="menubar">
              <li className="menu-text" role="menuitem">Tĩnh Hà Xuân Long blog</li>
              <li role="menuitem" className="is-dropdown-submenu-parent is-down-arrow" aria-haspopup="true" aria-expanded="false" aria-label="One">
                <a href="#" tabIndex="0">One</a>
                <ul className="menu vertical submenu is-dropdown-submenu first-sub" data-submenu="" aria-hidden="true" role="menu">
                  <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item"><a href="#">One</a></li>
                  <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item"><a href="#">Two</a></li>
                  <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item"><a href="#">Three</a></li>
                </ul>
              </li>
              <li role="menuitem"><a href="#">Two</a></li>
              <li role="menuitem"><a href="#">Three</a></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li><input type="search" placeholder="Search" /></li>
              <li><button type="button" className="button">Search</button></li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default MainBlogHeader
