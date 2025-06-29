import { useState, useEffect } from 'react';
import { CloudRain, Thermometer, Droplet, Wind, Eye, Gauge, Navigation, Calendar, TrendingUp, Database } from 'lucide-react';

// Types
interface Location {
  lat: number;
  lon: number;
  city: string;
  province: string;
}

interface DasarianFeatures {
  avg_temperature: number;
  total_rainfall: number;
  avg_humidity: number;
  avg_wind_speed: number;
  avg_wind_direction: number;
}

interface WeatherDetailData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  condition: string;
  description: string;
  precipitation: number;
  rainfall: {
    morning: number;
    afternoon: number;
    night: number;
  };
  alerts: string[];
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  dasarian_features: DasarianFeatures;
  timestamp: string;
}


interface DasarianFeatures {
  avg_temperature: number;
  total_rainfall: number;
  avg_humidity: number;
  avg_wind_speed: number;
  avg_wind_direction: number;
}

interface WeatherDetailData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  condition: string;
  description: string;
  precipitation: number;
  rainfall: {
    morning: number;
    afternoon: number;
    night: number;
  };
  alerts: string[];
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  dasarian_features: DasarianFeatures;
  timestamp: string;
}

interface WeatherPageProps {
  location: Location;
}

async function getWeatherDataFromBackend(location: Location) {
  const response = await fetch(
    `http://127.0.0.1:5000/weather-data?lat=${location.lat}&lon=${location.lon}`
  );

  if (!response.ok) {
    throw new Error("Gagal memuat data cuaca dari backend");
  }

  return await response.json();
}

function WeatherPage({ location }: WeatherPageProps) {
  const [weatherData, setWeatherData] = useState<WeatherDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const weather = await getWeatherDataFromBackend(location);
      setWeatherData(weather);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Gagal mengambil data cuaca');
    } finally {
      setIsLoading(false);
    }
  };

  setWeatherData(null);
  setIsLoading(true);
  fetchData();
}, [location]);

  const getWindDirection = (degrees: number) => {
    const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow h-24">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return <div className="p-4 text-red-500">Tidak ada data cuaca tersedia</div>;
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Data Cuaca Lengkap</h1>
        <p className="text-gray-600">
          📍 {weatherData.location.name}, {weatherData.location.country}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Koordinat: {weatherData.location.lat.toFixed(4)}, {weatherData.location.lon.toFixed(4)}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Diperbarui: {new Date(weatherData.timestamp).toLocaleString('id-ID')}
        </p>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Eye className="text-blue-500" size={20} />
          Cuaca Saat Ini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Thermometer className="text-blue-600" size={24} />
              <div>
                <div className="text-sm text-blue-600 font-medium">Suhu</div>
                <div className="text-2xl font-bold text-blue-800">{weatherData.temperature}°C</div>
                <div className="text-xs text-blue-600">Terasa {weatherData.feelsLike}°C</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <Droplet className="text-green-600" size={24} />
              <div>
                <div className="text-sm text-green-600 font-medium">Kelembapan</div>
                <div className="text-2xl font-bold text-green-800">{weatherData.humidity}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <Wind className="text-purple-600" size={24} />
              <div>
                <div className="text-sm text-purple-600 font-medium">Angin</div>
                <div className="text-2xl font-bold text-purple-800">{weatherData.windSpeed} km/j</div>
                <div className="text-xs text-purple-600">{getWindDirection(weatherData.windDirection)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-3">
              <Gauge className="text-orange-600" size={24} />
              <div>
                <div className="text-sm text-orange-600 font-medium">Tekanan Udara</div>
                <div className="text-2xl font-bold text-orange-800">{weatherData.pressure}</div>
                <div className="text-xs text-orange-600">hPa</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="text-gray-600" size={16} />
            <span className="font-medium text-gray-700">Kondisi: {weatherData.description}</span>
          </div>
          <div className="text-sm text-gray-600">
            Curah hujan: {weatherData.precipitation} mm
          </div>
        </div>
      </div>

      {/* Rainfall Forecast */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="text-blue-500" size={20} />
          Prakiraan Hujan Hari Ini
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
            <div className="text-2xl mb-2">🌅</div>
            <div className="font-semibold text-yellow-800">Pagi</div>
            <div className="text-2xl font-bold text-yellow-900">{weatherData.rainfall.morning}%</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="text-2xl mb-2">☀️</div>
            <div className="font-semibold text-orange-800">Siang</div>
            <div className="text-2xl font-bold text-orange-900">{weatherData.rainfall.afternoon}%</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
            <div className="text-2xl mb-2">🌙</div>
            <div className="font-semibold text-indigo-800">Malam</div>
            <div className="text-2xl font-bold text-indigo-900">{weatherData.rainfall.night}%</div>
          </div>
        </div>
      </div>

      {/* Dasarian Features */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="text-green-500" size={20} />
          Data Dasarian untuk Prediksi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-3">
              <Thermometer className="text-red-600" size={20} />
              <div>
                <div className="text-sm text-red-600 font-medium">Suhu Rata-rata</div>
                <div className="text-xl font-bold text-red-800">{weatherData.dasarian_features.avg_temperature}°C</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <CloudRain className="text-blue-600" size={20} />
              <div>
                <div className="text-sm text-blue-600 font-medium">Total Hujan</div>
                <div className="text-xl font-bold text-blue-800">{weatherData.dasarian_features.total_rainfall} mm</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <Droplet className="text-green-600" size={20} />
              <div>
                <div className="text-sm text-green-600 font-medium">Kelembapan Rata-rata</div>
                <div className="text-xl font-bold text-green-800">{weatherData.dasarian_features.avg_humidity}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <Wind className="text-purple-600" size={20} />
              <div>
                <div className="text-sm text-purple-600 font-medium">Kecepatan Angin</div>
                <div className="text-xl font-bold text-purple-800">{weatherData.dasarian_features.avg_wind_speed} m/s</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-center gap-3">
              <Navigation className="text-indigo-600" size={20} />
              <div>
                <div className="text-sm text-indigo-600 font-medium">Arah Angin</div>
                <div className="text-xl font-bold text-indigo-800">{weatherData.dasarian_features.avg_wind_direction.toFixed(0)}°</div>
                <div className="text-xs text-indigo-600">{getWindDirection(weatherData.dasarian_features.avg_wind_direction)}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" size={16} />
            <span className="font-medium text-blue-700">Informasi Data Dasarian</span>
          </div>
          <p className="text-sm text-blue-600">
            Data ini merupakan rata-rata/total dari prakiraan cuaca 5 hari ke depan yang digunakan 
            untuk prediksi pranata mangsa menggunakan model LVQ (Learning Vector Quantization).
          </p>
        </div>
      </div>

      {/* Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-yellow-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-700">
            ⚠️ Peringatan Cuaca
          </h2>
          <div className="space-y-2">
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800">{alert}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
