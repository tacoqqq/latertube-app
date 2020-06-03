import React, { Component } from 'react';
import './footer.css'

class LandingPageFooter extends Component {
    render(){
        return(
            <footer>
                <section id="contact-info-id">
                    <div className="contact-box">
                        <div className="pro-contact">
                            <p className="pro-contact-p">Daphne Fang &copy; 2020</p>
                            <div>
                                <ul className="pro-icon-container">
                                    <li className="pro-icon"><a href="https://www.linkedin.com/in/daphneysfang" target="_blank" rel="noopener noreferrer"><img src={require("../../img/logos/Linkedin-logo.png")} alt="linkedin" /></a></li>
                                    <li className="pro-icon"><a href="https://github.com/tacoqqq?tab=repositories&q=latertube&type=&language=" target="_blank" rel="noopener noreferrer"><img src={require("../../img/logos/github-logo.png")} alt="github" /></a></li>
                                    <li className="pro-icon"><a href="mailto:daphneys.fang@gmail.com?Subject=Hello%20there" target="_top" rel="noopener noreferrer"><img src={require("../../img/logos/email-icon-logo.png")} alt="email" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>           
                </section>
            </footer>
        )
    }
}

export default LandingPageFooter;


