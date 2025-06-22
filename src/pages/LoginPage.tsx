import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Username atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 py-8 px-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sprout className="text-white h-10 w-10" />
          </div>
          <h1 className="text-3xl font-display text-white font-bold mb-2">Pranata Mangsa</h1>
          <p className="text-primary-100 text-lg">Sistem Informasi Cuaca untuk Petani</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selamat Datang Petani</h2>
            <p className="text-gray-600">Masuk untuk mengakses informasi Pranata Mangsa</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="Masukkan username"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Gunakan username: <span className="font-medium">petani</span></p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="Masukkan password"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Gunakan password: <span className="font-medium">petani123</span></p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 font-medium text-base disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              'Masuk ke Dashboard'
            )}
          </button>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Demo Login:</span>
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>👤 Username: <span className="font-mono bg-gray-200 px-2 py-1 rounded">petani</span></div>
              <div>🔒 Password: <span className="font-mono bg-gray-200 px-2 py-1 rounded">petani123</span></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;