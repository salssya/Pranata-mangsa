import { useState, useEffect } from 'react';
import { WeatherData, Location } from '../types';
import { getWeatherData } from '../utils/weatherUtils';
import { CloudRain, Thermometer, Droplet, Wind } from 'lucide-react';

interface WeatherPageProps {
  location: Location;
}

function WeatherPage({ location }: WeatherPageProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const weather = await getWeatherData(location);
        setWeatherData(weather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <div className="animate-pulse text-primary-500 text-xl">
          Memuat informasi cuaca...
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="bg-secondary-500 px-6 py-4">
          <h1 className="text-2xl font-display text-white">Informasi Cuaca</h1>
          <p className="text-secondary-100">
            {location.city}, {location.province}
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-700 p-8 text-white text-center">
          <div className="mb-6">
            <CloudRain className="h-16 w-16 mx-auto mb-2" />
            <h2 className="text-3xl font-bold">{weatherData.temperature}°C</h2>
            <p className="text-secondary-100">{weatherData.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <Thermometer className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm">Terasa Seperti</div>
              <div className="font-bold">{weatherData.feelsLike}°C</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Droplet className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm">Kelembapan</div>
              <div className="font-bold">{weatherData.humidity}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Wind className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm">Kecepatan Angin</div>
              <div className="font-bold">{weatherData.windSpeed} km/j</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Prakiraan Hujan Hari Ini</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Pagi</div>
              <div className="text-2xl font-bold text-gray-700">{weatherData.rainfall.morning}%</div>
              <div className="text-sm text-gray-600">Kemungkinan Hujan</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Siang</div>
              <div className="text-2xl font-bold text-gray-700">{weatherData.rainfall.afternoon}%</div>
              <div className="text-sm text-gray-600">Kemungkinan Hujan</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Malam</div>
              <div className="text-2xl font-bold text-gray-700">{weatherData.rainfall.night}%</div>
              <div className="text-sm text-gray-600">Kemungkinan Hujan</div>
            </div>
          </div>

          {weatherData.alerts.length > 0 && (
            <div className="mt-6 bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
              <h4 className="text-warning font-medium mb-2">Peringatan Cuaca</h4>
              <ul className="list-disc list-inside space-y-1">
                {weatherData.alerts.map((alert, index) => (
                  <li key={index} className="text-warning/80">{alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;