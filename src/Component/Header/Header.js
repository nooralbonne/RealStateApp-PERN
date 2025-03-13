import React, { useState, useEffect } from 'react';
import '../Header/Header.css';  // Assuming you have a CSS file for styles
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scroll-header' : ''}`} id="header" style={{ padding: '1rem 0' }}>
    
    <nav className="nav container">
        <a href="/" className="nav__logo">
         <i className='bx bxs-home-alt-2'></i> Triangle  
        </a>

        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
  <a href="/" className="nav__link active-link">
    <i className='bx bx-home-alt-2'></i>
    <span className="nav__text">Home</span>
  </a>
</li>
{/* <box-icon type='solid' name='cart-alt'></box-icon> */}
                    <li className="nav__item">
                        <Link to="/BuyProp" className="nav__link">
                        <a href="#Buypopular" className="nav__link">
                                <i className='bx bx-cart'></i>
                                <span>Buy</span>
                                </a>
                                </Link>
                        </li>

                        <li className="nav__item">
                        <Link to="/RentProp" className="nav__link">
                        <a href="#Rentpopular" className="nav__link">
                                <i className='bx bx-building-house'></i>
                                <span>Rent</span>
                                </a>
                                </Link>
                        </li>

                        <li className="nav__item">
                        <Link to="/WatchLater" className="nav__link">
                                <i className='bx bx-like'></i>
                                <span>Favorite</span>
                                </Link>
                        </li>


            <li className="nav__item">
              <a href="#contact" className="nav__link">
                <i className='bx bx-phone'></i>
                <span>Contact</span>
              </a>
            </li>



          </ul>
        </div>

        {/* Theme change button */}
        {/* <i className='bx bx-moon change-theme' id="theme-button"></i> */}
        <ThemeSwitcher/>
        
        <a href="/Search" className="button nav__button">Search </a>
      </nav>
    </header>
  );
};

export default Header;