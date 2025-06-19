import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f2ed]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left side - Login Form */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1f3b73]">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#e1a95f] focus:ring-[#e1a95f]/20 border-gray-300 rounded"
                    checked={formData.remember}
                    onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                  />
                  <label className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link 
                  to="/forgot-password"
                  className="text-sm text-[#e1a95f] hover:text-[#1f3b73] transition-colors duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e1a95f] text-white py-3 px-4 rounded-lg font-semibold
                  hover:bg-[#1f3b73] transition-all duration-300 transform hover:scale-[1.02]
                  shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register"
                  className="text-[#e1a95f] hover:text-[#1f3b73] font-semibold transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;