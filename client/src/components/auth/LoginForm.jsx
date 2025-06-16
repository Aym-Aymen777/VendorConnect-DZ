import {useState} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { User } from 'lucide-react';

export const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{t('login')}</h2>
        <p className="text-gray-600 mt-2">Welcome back to our marketplace</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Loading...
            </div>
          ) : t('login')}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700 font-medium mb-2">Demo Accounts:</p>
          <div className="space-y-1 text-xs">
            <p><strong>Consumer:</strong> john@example.com</p>
            <p><strong>Supplier:</strong> ahmed@store.com</p>
            <p><strong>Admin:</strong> admin@platform.com</p>
          </div>
        </div>
        <button
          onClick={onSwitch}
          className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
        >
          Don't have an account? {t('register')}
        </button>
      </div>
    </div>
  );
};
