import { useState, useEffect } from 'react';
import { MangsaInfo, WeatherData, Location } from '../types';
import { getMangsaInfo } from '../utils/mangsaUtils';
import { getWeatherData } from '../utils/weatherUtils';
import { Sprout, AlertTriangle } from 'lucide-react';

interface RecommendationsPageProps {
  location: Location;
}

function RecommendationsPage({ location }: RecommendationsPageProps) {
  const [mangsaInfo, setMangsaInfo] = useState<MangsaInfo | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [mangsa, weather] = await Promise.all([
          getMangsaInfo(new Date(), location),
          getWeatherData(location)
        ]);
        setMangsaInfo(mangsa);
        setWeatherData(weather);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          Memuat rekomendasi pertanian...
        </div>
      </div>
    );
  }

  if (!mangsaInfo || !weatherData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="bg-earth-500 px-6 py-4">
          <h1 className="text-2xl font-display text-white flex items-center">
            <Sprout className="h-6 w-6 mr-2" />
            Rekomendasi Tanam
          </h1>
          <p className="text-earth-100">
            {location.city}, {location.province}
          </p>
        </div>

        <div className="p-6">
          {weatherData.alerts.length > 0 && (
            <div className="mb-6 bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-warning font-medium">Peringatan Cuaca</h3>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {weatherData.alerts.map((alert, index) => (
                      <li key={index} className="text-warning/80">{alert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tanaman yang Cocok Ditanam
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mangsaInfo.suitableCrops.map((crop, index) => (
                <div key={index} className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                  <h3 className="font-medium text-primary-700">{crop.name}</h3>
                  <p className="mt-1 text-primary-600">{crop.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Status Pertanian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="text-sm text-gray-500">Status Musim</div>
                <div className="font-medium text-gray-800">{mangsaInfo.farmingStatus}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="text-sm text-gray-500">Aktivitas Utama</div>
                <div className="font-medium text-gray-800">{mangsaInfo.mainActivity}</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tips Pertanian
            </h2>
            <ul className="space-y-3">
              {mangsaInfo.farmingTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-100 text-primary-600 text-xs flex-shrink-0 mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationsPage;