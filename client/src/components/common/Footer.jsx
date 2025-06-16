import React from 'react';
import PropTypes from 'prop-types';
import { FaGlobe, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = ({ companyInfo }) => {
  return (
    <footer className=" text-white py-12 relative bottom-0 md:py-16">
      {/* separate line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Company Logo Section */}
      <div className="space-y-4 flex flex-col items-center md:items-start">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-slate-900 font-bold text-2xl">
            DE<span className="text-orange-500">🏠</span>
          </div>
          <div className="text-slate-900 font-bold text-xl tracking-wider">
            DECOR
          </div>
        </div>
      </div>

      {/* Company Section - الشركة */}
      <div className="space-y-4 text-center md:text-right">
        <h4 className="text-white text-lg font-semibold tracking-wide mb-6">
          الشركة
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="/about" className="hover:text-orange-500 transition-colors duration-300">
              الرئيسية
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-orange-500 transition-colors duration-300">
              من نحن
            </a>
          </li>
          <li>
            <a href="/why-us" className="hover:text-orange-500 transition-colors duration-300">
              لماذا؟
            </a>
          </li>
        </ul>
      </div>

      {/* Leadership Section - القيادة */}
      <div className="space-y-4 text-center md:text-right">
        <h4 className="text-white text-lg font-semibold tracking-wide mb-6">
          القيادة
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="/management" className="hover:text-orange-500 transition-colors duration-300">
              فريق الإدارة
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-orange-500 transition-colors duration-300">
              خدمات
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:text-orange-500 transition-colors duration-300">
              الأسئلة الشائعة
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Information Section - معلومات الاتصال */}
      <div className="space-y-4 text-center md:text-right">
        <h4 className="text-white text-lg font-semibold tracking-wide mb-6">
          معلومات الاتصال
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-end space-x-3 space-x-reverse">
            <span className="text-gray-300">www.deadecor.com</span>
            <FaGlobe className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex items-center justify-center md:justify-end space-x-3 space-x-reverse">
            <span className="text-gray-300" dir="ltr">contact@deadecor.com</span>
            <FaEnvelope className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex items-center justify-center md:justify-end space-x-3 space-x-reverse">
            <span className="text-gray-300" dir="ltr">+213 550 05 96 03</span>
            <FaPhone className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Copyright Section */}
    <div className="mt-12 pt-8 border-t border-gray-700">
      <div className="text-center text-gray-400 text-sm">
        <p>© DEADECOR 2025. جميع الحقوق محفوظة | سياسة الخصوصية و شروط الاستخدام</p>
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
  companyInfo: 'DEADECOR - شركة متخصصة في التصميم الداخلي والديكور الحديث',
};

export default Footer;