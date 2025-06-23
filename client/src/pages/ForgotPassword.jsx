import React, { useState } from 'react';
import { Mail, ArrowRight, Lock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import  useAuthStore  from '../store/AuthStore.js';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuthStore();

  const handleSendReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await forgotPassword(email);
      const resetLink = res?.data?.resetLink;
      if (!resetLink) {
        toast.error('Failed to send reset email');
        return;
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_email: email,
          reset_link: resetLink,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Reset link sent via email.');
      setEmail('');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f4f2ed' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#1f3b73' }}>
            <Lock className="w-8 h-8" style={{ color: '#f4f2ed' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f3b73' }}>
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendReset} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#1f3b73' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-opacity-100 focus:outline-none transition-colors duration-200"
                  style={{ 
                    borderColor: '#e5e7eb', 
                    color: '#1f3b73',
                    backgroundColor: '#f4f2ed'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1f3b73] text-white text-center mt-4 py-1 flex items-center justify-center rounded-lg hover:bg-opacity-90 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;