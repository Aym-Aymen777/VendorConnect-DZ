import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f2ed] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1f3b73]">Create Account</h2>
              <p className="text-gray-600 mt-2">Join our community today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-[#f4f2ed] border-2 border-transparent 
                    focus:border-[#e1a95f] focus:ring-2 focus:ring-[#e1a95f]/20 
                    text-[#1f3b73] placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter your username"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-[#f4f2ed] border-2 border-transparent 
                    focus:border-[#e1a95f] focus:ring-2 focus:ring-[#e1a95f]/20 
                    text-[#1f3b73] placeholder-gray-400 transition-all duration-300"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-[#f4f2ed] border-2 border-transparent 
                    focus:border-[#e1a95f] focus:ring-2 focus:ring-[#e1a95f]/20 
                    text-[#1f3b73] placeholder-gray-400 transition-all duration-300"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-[#f4f2ed] border-2 border-transparent 
                    focus:border-[#e1a95f] focus:ring-2 focus:ring-[#e1a95f]/20 
                    text-[#1f3b73] placeholder-gray-400 transition-all duration-300"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#e1a95f] focus:ring-[#e1a95f]/20 border-gray-300 rounded"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                />
                <label className="ml-2 block text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#e1a95f] hover:text-[#1f3b73] transition-colors duration-300">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-[#e1a95f] hover:text-[#1f3b73] transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e1a95f] text-white py-3 px-4 rounded-lg font-semibold
                  hover:bg-[#1f3b73] transition-all duration-300 transform hover:scale-[1.02]
                  shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login"
                  className="text-[#e1a95f] hover:text-[#1f3b73] font-semibold transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;