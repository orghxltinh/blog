import React, { Component } from 'react';
import AboutMeMini from '../components/about-me-mini';

import LatestNew from '../components/latest-news';

class HomePage extends Component{
  render(){
    return (
      <div id='home-page' className='row'>
        <main id="main" className='main small-12 medium-8 large-8 columns'>
          <LatestNew />

        </main>
        <aside className='aside small-12 medium-4 large-4 columns'>
          <AboutMeMini />
        </aside>

      </div>
    );
  }
}

export default HomePage;
