import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer section">
            <div className="footer__container container grid">
                <div>
                    <a href="#" className="footer__logo">
                        Triangle <i className='bx bxs-home'></i>
                    </a>
                    <p className="footer__description">
                        Our vision is to make all people <br />
                        the best place to live for them.
                    </p>
                </div>

                <div className="footer__content">
                    <div>
                        <h3 className="footer__title">About</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">About Us</a></li>
                            <li><a href="#" className="footer__link">Features</a></li>
                            <li><a href="#" className="footer__link">News & Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer__title">Company</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">How We Work?</a></li>
                            <li><a href="#" className="footer__link">Capital</a></li>
                            <li><a href="#" className="footer__link">Security</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer__title">Support</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">FAQs</a></li>
                            <li><a href="#" className="footer__link">Support center</a></li>
                            <li><a href="#" className="footer__link">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer__title">Follow Us</h3>
                        <ul className="footer__social">
                            <li>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                    <i className='bx bxl-facebook-square'></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                    <i className='bx bxl-instagram-alt'></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                    <i className='bx bxl-pinterest'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer__info container">
                <span className="footer__copy">
                    © Triangle. All rights reserved
                </span>
                <div className="footer__privacy">
                    <a href="#">Terms & Agreements</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
