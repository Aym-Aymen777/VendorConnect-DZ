import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import { toast } from 'sonner';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPassword({ token, password });
      if (res?.success) {
        toast.success("Password reset successful");
        navigate('/login');
      } else {
        toast.error(res?.message || "Reset failed");
      }
    } catch (err) {
      toast.error("Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 25, text: 'Too short', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, text: 'Weak', color: 'bg-yellow-500' };
    if (password.length < 12) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f4f2ed' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#1f3b73' }}>
            <Shield className="w-8 h-8" style={{ color: '#f4f2ed' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f3b73' }}>
            Reset Your Password
          </h1>
          <p className="text-gray-600">
            Enter your new password below to secure your account.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#1f3b73' }}>
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors duration-200"
                  style={{ borderColor: '#e5e7eb' }}
                  onFocus={(e) => e.target.style.borderColor = '#e1a95f'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Password strength</span>
                    <span className={`font-medium ${passwordStrength.strength >= 75 ? 'text-green-600' : passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`} style={{ width: `${passwordStrength.strength}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#1f3b73' }}>
                Confirm Password
              </label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200"
                  style={{ borderColor: confirmPassword && password === confirmPassword ? '#10b981' : '#e5e7eb' }}
                  onFocus={(e) => e.target.style.borderColor = '#e1a95f'}
                  onBlur={(e) => e.target.style.borderColor = confirmPassword && password === confirmPassword ? '#10b981' : '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {confirmPassword && (
                <div className="mt-2 flex items-center text-sm">
                  {password === confirmPassword ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Passwords match</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <span className="w-4 h-4 mr-1">✕</span>
                      <span>Passwords don't match</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading || !password || !confirmPassword}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: '#1f3b73', boxShadow: '0 0 0 4px rgba(225, 169, 95, 0.2)' }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px rgba(225, 169, 95, 0.4)'}
              onBlur={(e) => e.target.style.boxShadow = '0 0 0 4px rgba(225, 169, 95, 0.2)'}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Resetting Password...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Reset Password
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Make sure your password is strong and unique to keep your account secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
