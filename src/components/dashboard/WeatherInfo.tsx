import { CloudRain, Thermometer, Droplet, Wind, AlertTriangle, RefreshCw } from 'lucide-react';
import { WeatherData, Location } from '../../types';
import { useState } from 'react';
import { getWeatherData } from '../../utils/weatherUtils';

interface WeatherInfoProps {
  weatherData: WeatherData | null;
  location: Location;
  onRefresh?: () => void;
}

function WeatherInfo({ weatherData, location, onRefresh }: WeatherInfoProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 animate-pulse h-64">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Determine background class based on weather condition
  const getWeatherBackground = () => {
    switch (weatherData.condition) {
      case 'rainy':
        return 'bg-gradient-to-br from-blue-500 to-blue-700';
      case 'cloudy':
        return 'bg-gradient-to-br from-gray-400 to-gray-600';
      case 'sunny':
        return 'bg-gradient-to-br from-amber-400 to-amber-600';
      case 'stormy':
        return 'bg-gradient-to-br from-purple-500 to-purple-700';
      default:
        return 'bg-gradient-to-br from-secondary-400 to-secondary-600';
    }
  };

  // Get weather icon based on condition
  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case 'rainy':
        return <CloudRain className="h-12 w-12 sm:h-16 sm:w-16 text-white drop-shadow-lg" />;
      case 'cloudy':
        return <Cloud className="h-12 w-12 sm:h-16 sm:w-16 text-white drop-shadow-lg" />;
      case 'sunny':
        return <Sun className="h-12 w-12 sm:h-16 sm:w-16 text-white drop-shadow-lg" />;
      case 'stormy':
        return <Storm className="h-12 w-12 sm:h-16 sm:w-16 text-white drop-shadow-lg" />;
      default:
        return <CloudRain className="h-12 w-12 sm:h-16 sm:w-16 text-white drop-shadow-lg" />;
    }
  };

  // Simple Cloud component
  function Cloud(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      </svg>
    );
  }

  // Simple Sun component
  function Sun(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    );
  }

  // Simple Storm component
  function Storm(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path>
        <path d="m13 12-3 5h4l-3 5"></path>
      </svg>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="bg-secondary-500 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Informasi Cuaca</h2>
          <div className="text-secondary-100 text-xs sm:text-sm">
            📍 {location.city}, {location.province}
          </div>
        </div>
        {onRefresh && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
            title="Refresh data cuaca"
          >
            <RefreshCw className={`h-4 w-4 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
      
      <div className={`${getWeatherBackground()} p-4 sm:p-6 flex-1 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border border-white rounded-full"></div>
          <div className="absolute top-8 right-8 w-4 h-4 border border-white rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 border border-white rounded-full"></div>
        </div>
        
        <div className="text-center mb-4 sm:mb-6 relative z-10">
          <div className="mb-3 sm:mb-4">
            {getWeatherIcon()}
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
            {weatherData.temperature}°C
          </h3>
          <p className="text-white/90 capitalize text-sm sm:text-base font-medium">
            {weatherData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm relative z-10">
          <div className="flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
            <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-white mb-1" />
            <span className="text-xs text-white/80">Terasa</span>
            <span className="font-bold text-sm sm:text-base">{weatherData.feelsLike}°C</span>
          </div>
          <div className="flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
            <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-white mb-1" />
            <span className="text-xs text-white/80">Kelembapan</span>
            <span className="font-bold text-sm sm:text-base">{weatherData.humidity}%</span>
          </div>
          <div className="flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
            <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-white mb-1" />
            <span className="text-xs text-white/80">Angin</span>
            <span className="font-bold text-sm sm:text-base">{weatherData.windSpeed} km/j</span>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="font-medium text-gray-700 text-sm sm:text-base">Prakiraan Hujan</h3>
          <CloudRain className="h-4 w-4 text-gray-500" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">🌅 Pagi</div>
            <div className="font-bold text-sm sm:text-base text-blue-600">{weatherData.rainfall.morning}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">☀️ Siang</div>
            <div className="font-bold text-sm sm:text-base text-blue-600">{weatherData.rainfall.afternoon}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">🌙 Malam</div>
            <div className="font-bold text-sm sm:text-base text-blue-600">{weatherData.rainfall.night}%</div>
          </div>
        </div>
        
        {weatherData.alerts.length > 0 && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <div className="text-xs font-medium text-amber-800 mb-1">⚠️ Peringatan</div>
                <div className="text-xs text-amber-700">
                  {weatherData.alerts[0]}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-400">
            Data real-time dari OpenWeatherMap
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;