import React , { Component } from 'react';
import LandingPageContent from '../components/lp-content/lp-content';
import LandingPageFooter from '../components/footer/footer';

class LandingPage extends Component {
  render(){
    return(
      <div>
        <LandingPageContent />
        <LandingPageFooter />
      </div>
    )
  }
}

export default LandingPage;