import React from 'react';
import PropTypes from 'prop-types';
import { FaGlobe, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = ({ companyInfo }) => {
  return (
    <footer className="text-[#1f3b73] py-12 md:py-16 relative">
      {/* Top Separator Line */}
      <div className="absolute top-0 left-0 w-full h-[0.5px] bg-[#1f3b73]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <img src="/logo.png" alt="" className='w-40 mx-auto md:mx-0 md:w-44 '/>

          {/* Company Links */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-[#1f3b73] text-lg font-semibold tracking-wide mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Why Us?'].map((text, i) => (
                <li key={i}>
                  <a href="/" className="hover:text-[#CBA135] transition-colors duration-300">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Leadership Links */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-[#1f3b73] text-lg font-semibold tracking-wide mb-6">
              Information
            </h4>
            <ul className="space-y-3">
              {['Management Team', 'Services', 'FAQ'].map((text, i) => (
                <li key={i}>
                  <a href="/" className="hover:text-[#CBA135] transition-colors duration-300">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-[#1f3b73] text-lg font-semibold tracking-wide mb-6">
              Contact Info
            </h4>
            <div className="space-y-4 text-[#1f3b73]">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <FaGlobe className="text-[#e1a95f]" />
                <span>www.logo.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <FaEnvelope className="text-[#e1a95f]" />
                <span>contact@logo.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <FaPhone className="text-[#e1a95f]" />
                <span>+213 550 05 96 03</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-[#294d96aa] text-sm">
            <p>© LOGO 2025. All Rights Reserved | Privacy Policy & Terms of Use</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  companyInfo: PropTypes.string,
};

Footer.defaultProps = {
  companyInfo: 'LOGO - Specialized in Interior Design and Modern Decoration',
};

export default Footer;