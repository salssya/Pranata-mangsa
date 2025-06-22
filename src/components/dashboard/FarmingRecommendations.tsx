import { Sprout, AlertTriangle, Leaf, TrendingUp, CheckCircle } from 'lucide-react';
import { MangsaInfo, WeatherData } from '../../types';

interface FarmingRecommendationsProps {
  mangsaInfo: MangsaInfo | null;
  weatherData: WeatherData | null;
}

function FarmingRecommendations({ mangsaInfo, weatherData }: FarmingRecommendationsProps) {
  if (!mangsaInfo || !weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 animate-pulse h-64">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-r from-earth-500 to-earth-600 px-4 sm:px-6 py-4 flex items-center">
        <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        <h2 className="ml-2 text-lg sm:text-xl font-semibold text-white">Rekomendasi Pertanian</h2>
      </div>
      
      <div className="p-4 sm:p-6">
        {weatherData.alerts.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-3 sm:p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="ml-3 flex-1">
                <h3 className="text-sm sm:text-base font-medium text-amber-800 mb-2">⚠️ Peringatan Cuaca</h3>
                <div className="text-sm text-amber-700">
                  <ul className="list-disc pl-4 space-y-1">
                    {weatherData.alerts.map((alert, index) => (
                      <li key={index} className="leading-relaxed">{alert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center mb-3 sm:mb-4">
            <Leaf className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Tanaman yang Cocok Ditanam</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {mangsaInfo.suitableCrops.map((crop, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-green-50 rounded-lg p-3 sm:p-4 border border-primary-200 hover:border-primary-300 transition-colors duration-200">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Sprout className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-700 text-sm sm:text-base mb-1">{crop.name}</h4>
                    <p className="text-xs sm:text-sm text-primary-600 leading-relaxed">{crop.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center mb-3 sm:mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Status Pertanian</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <div className="text-xs sm:text-sm text-gray-500">Status Musim</div>
              </div>
              <div className="font-semibold text-gray-800 text-sm sm:text-base">{mangsaInfo.farmingStatus}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="text-xs sm:text-sm text-gray-500">Aktivitas Utama</div>
              </div>
              <div className="font-semibold text-gray-800 text-sm sm:text-base">{mangsaInfo.mainActivity}</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-3 sm:mb-4">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Tips Pertanian</h3>
          </div>
          <div className="space-y-3">
            {mangsaInfo.farmingTips.map((tip, index) => (
              <div key={index} className="flex items-start p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100 hover:border-green-200 transition-colors duration-200">
                <span className="inline-flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-100 text-primary-600 text-xs sm:text-sm font-bold flex-shrink-0 mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmingRecommendations;