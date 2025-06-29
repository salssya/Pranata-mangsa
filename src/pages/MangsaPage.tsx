import { useState, useEffect } from 'react';
import { MangsaInfo, Location, WeatherData } from '../types';
import { getMangsaInfo, getMangsaInfoWithML } from '../utils/mangsaUtils';
import { getWeatherData } from '../utils/weatherUtils';

import { Calendar, CloudRain, Sprout, Bell, BookOpen, TrendingUp, MapPin, Clock, RefreshCw, Brain, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MangsaPageProps {
  location: Location;
}

function MangsaPage({ location }: MangsaPageProps) {
  const [mangsaInfo, setMangsaInfo] = useState<MangsaInfo | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usePrediction, setUsePrediction] = useState(true);
  const savedLocation = JSON.parse(localStorage.getItem('userLocation') || '{}');
  const [predictionStatus, setPredictionStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const fetchData = async () => {
    setIsLoading(true);
    setPredictionStatus('loading');
    
    try {
      // Always fetch weather data
      const weather = await getWeatherData(location);
      setWeatherData(weather);

      let mangsa: MangsaInfo;
      
      if (usePrediction) {
        try {
          // Try ML prediction first
          const predictedMangsa = await getMangsaInfoWithML(location);
          if (predictedMangsa) {
            mangsa = predictedMangsa;
            setPredictionStatus('success');
          } else {
            throw new Error('No prediction returned');
          }
        } catch (error) {
          console.warn('ML prediction failed, falling back to date-based:', error);
          mangsa = await getMangsaInfo(new Date(), location);
          setPredictionStatus('error');
        }
      } else {
        // Use date-based mangsa
        mangsa = await getMangsaInfo(new Date(), location);
        setPredictionStatus('success');
      }
      
      setMangsaInfo(mangsa);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
      setPredictionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location, usePrediction]);

  const handleRefreshWeather = async () => {
    try {
      const weather = await getWeatherData(location);
      setWeatherData(weather);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing weather data:', error);
    }
  };

  const togglePredictionMode = () => {
    setUsePrediction(!usePrediction);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-4 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <div className="text-primary-500 text-lg sm:text-xl font-medium">
            {usePrediction ? 'Memuat Prediksi AI Pranata Mangsa...' : 'Memuat Dashboard Pranata Mangsa...'}
          </div>
          <div className="text-gray-500 text-sm mt-2">
            📍 {location.city}, {location.province}
          </div>
        </div>
      </div>
    );
  }

  const dashboardCards = [
    {
      title: 'Kalender Mangsa',
      description: 'Lihat semua 12 mangsa dalam setahun dengan detail lengkap',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      link: '/dashboard/calendar',
      emoji: '📅'
    },
    {
      title: 'Informasi Cuaca',
      description: 'Prakiraan cuaca terkini dan peringatan untuk pertanian',
      icon: CloudRain,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      link: '/dashboard/weather',
      emoji: '🌤️'
    },
    {
      title: 'Rekomendasi Tanam',
      description: 'Saran tanaman yang cocok berdasarkan mangsa saat ini',
      icon: Sprout,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      link: '/dashboard/recommendations',
      emoji: '🌱'
    },
    {
      title: 'Pengingat',
      description: 'Jadwal kegiatan pertanian dan notifikasi penting',
      icon: Bell,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      link: '/dashboard/reminders',
      emoji: '🔔'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-green-600 rounded-2xl shadow-card overflow-hidden">
        <div className="relative p-6 sm:p-8 lg:p-10">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute top-16 right-12 w-8 h-8 border border-white rounded-full"></div>
            <div className="absolute bottom-12 left-16 w-12 h-12 border border-white rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-6 h-6 border border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-3">
                Pranata Mangsa
              </h1>
              <p className="text-primary-100 text-lg sm:text-xl mb-2">
                Sistem Informasi Cuaca untuk Petani Modern
              </p>
              <div className="flex items-center justify-center text-primary-100">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm sm:text-base">{location.city}, {location.province}</span>
              </div>
              {lastUpdated && (
                <div className="flex items-center justify-center text-primary-100 mt-2">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  <span className="text-xs">
                    Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID')}
                  </span>
                </div>
              )}
            </div>

            {/* AI Prediction Toggle */}
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">Mode Prediksi AI</span>
                </div>
                <button
                  onClick={togglePredictionMode}
                  className="flex items-center space-x-2 text-white hover:text-primary-100 transition-colors"
                >
                  {usePrediction ? (
                    <ToggleRight className="h-6 w-6 text-green-300" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-300" />
                  )}
                  <span className="text-sm">{usePrediction ? 'Aktif' : 'Nonaktif'}</span>
                </button>
              </div>
              
              <div className="text-white/80 text-sm">
                {usePrediction ? (
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      predictionStatus === 'success' ? 'bg-green-400' :
                      predictionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
                    }`}></div>
                    {predictionStatus === 'success' && 'Menggunakan prediksi AI berdasarkan data cuaca real-time'}
                    {predictionStatus === 'error' && 'Prediksi AI gagal, menggunakan kalender tradisional'}
                    {predictionStatus === 'loading' && 'Memproses prediksi AI...'}
                  </div>
                ) : (
                  'Menggunakan kalender Pranata Mangsa tradisional berdasarkan tanggal'
                )}
              </div>
            </div>

            {/* Current Mangsa Quick Info */}
            {mangsaInfo && (
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                    <span className="text-white/90 text-sm font-medium">
                      {usePrediction && predictionStatus === 'success' ? 'Prediksi Mangsa AI' : 'Mangsa Saat Ini'}
                    </span>
                    {usePrediction && predictionStatus === 'success' && (
                      <Brain className="h-4 w-4 ml-2 text-white animate-pulse" />
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                    {mangsaInfo.name}
                  </h2>
                  <div className="flex items-center justify-center text-white/90 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm sm:text-base">{mangsaInfo.period}</span>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    {mangsaInfo.characteristics}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {mangsaInfo && weatherData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-card p-4 border-l-4 border-primary-500">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">
                  {usePrediction && predictionStatus === 'success' ? 'Prediksi AI' : 'Mangsa Aktif'}
                </div>
                <div className="font-semibold text-primary-700">{mangsaInfo.name}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-4 border-l-4 border-blue-500">
            <div className="flex items-center">
              <CloudRain className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Suhu Real-time</div>
                <div className="font-semibold text-blue-700">{weatherData.temperature}°C</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Status Pertanian</div>
                <div className="font-semibold text-green-700">{mangsaInfo.farmingStatus}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-4 border-l-4 border-amber-500">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-amber-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Aktivitas Utama</div>
                <div className="font-semibold text-amber-700 text-sm">{mangsaInfo.mainActivity}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-earth-500 to-earth-600 rounded-xl shadow-card p-6 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
          Mulai Jelajahi Pranata Mangsa
        </h2>
        <p className="text-earth-100 mb-6 max-w-2xl mx-auto">
          Gunakan kearifan tradisional yang diperkuat dengan teknologi AI untuk meningkatkan hasil pertanian Anda. 
          Mulai dengan melihat kalender mangsa lengkap atau cek rekomendasi tanam untuk mangsa saat ini.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-earth-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Lihat Kalender Mangsa
          </Link>
          <Link
            to="/dashboard/recommendations"
            className="inline-flex items-center justify-center px-6 py-3 bg-earth-700 text-white font-semibold rounded-lg hover:bg-earth-800 transition-colors duration-200"
          >
            <Sprout className="h-5 w-5 mr-2" />
            Rekomendasi Tanam
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MangsaPage;