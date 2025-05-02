import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const leftNavItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const rightNavItems = [
    { name: 'Instagram Feed', path: '/instagram-feed' },
    { name: 'Blog', path: '/journal' },
    { name: 'Feedback', path: '/feedback' }
  ];

  const allNavItems = [
    ...leftNavItems,
    ...rightNavItems
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/arcelevenarchitect', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/arcelevenarchitect', label: 'Twitter' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/arcelevenarchitect', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com/arcelevenarchitect', label: 'Instagram' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Desktop Navigation - All links in one row */}
        <div className="footer-nav desktop-nav">
          <ul className="footer-links">
            {allNavItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Social and Brand */}
        <div className="footer-social desktop-social">
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <span className="footer-brand-name">ARCELEVENARCHITECT</span>
        </div>

        {/* Mobile Navigation - Split into left and right */}
        <div className="mobile-footer-top">
          {/* Left navigation for mobile */}
          <div className="footer-nav mobile-nav-left">
            <ul className="footer-links">
              {leftNavItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right navigation for mobile */}
          <div className="footer-nav mobile-nav-right">
            <ul className="footer-links">
              {rightNavItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Social and Brand */}
        <div className="mobile-footer-bottom">
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="footer-brand-container">
            <span className="footer-brand-name">ARCELEVENARCHITECT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;