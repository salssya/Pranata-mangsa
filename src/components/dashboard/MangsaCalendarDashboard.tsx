import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info, Leaf, Sun, CloudRain, Clock } from 'lucide-react';
import { MangsaInfo, Location } from '../../types';
import { getAllMangsaInfo, getCurrentMangsa } from '../../utils/mangsaUtils';

interface MangsaCalendarDashboardProps {
  location: Location;
}

function MangsaCalendarDashboard({ location }: MangsaCalendarDashboardProps) {
  const [selectedMangsa, setSelectedMangsa] = useState<MangsaInfo | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allMangsa, setAllMangsa] = useState<MangsaInfo[]>([]);
  const [currentMangsa, setCurrentMangsa] = useState<MangsaInfo | null>(null);

  useEffect(() => {
    const mangsa = getAllMangsaInfo();
    const current = getCurrentMangsa(new Date());
    setAllMangsa(mangsa);
    setCurrentMangsa(current);
    setSelectedMangsa(current);
  }, []);

  const getSeasonIcon = (characteristics: string) => {
    const char = characteristics.toLowerCase();
    if (char.includes('hujan') || char.includes('basah')) {
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    } else if (char.includes('kering') || char.includes('kemarau')) {
      return <Sun className="h-5 w-5 text-yellow-500" />;
    }
    return <Leaf className="h-5 w-5 text-green-500" />;
  };

  const getMangsaColor = (mangsa: MangsaInfo, isCurrent: boolean) => {
    if (isCurrent) {
      return 'bg-gradient-to-br from-primary-500 to-primary-600 text-white border-primary-600';
    }
    
    const char = mangsa.characteristics.toLowerCase();
    if (char.includes('hujan') || char.includes('basah')) {
      return 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 border-blue-200 hover:border-blue-300';
    } else if (char.includes('kering') || char.includes('kemarau')) {
      return 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800 border-amber-200 hover:border-amber-300';
    }
    return 'bg-gradient-to-br from-green-50 to-green-100 text-green-800 border-green-200 hover:border-green-300';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', { 
      dateStyle: 'full' 
    }).format(date);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-3" />
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white">
                  Kalender Pranata Mangsa
                </h1>
                <p className="text-primary-100 text-sm sm:text-base">
                  📍 {location.city}, {location.province}
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              {formatDate(currentDate)}
            </div>
          </div>
        </div>

        {/* Current Mangsa Highlight */}
        {currentMangsa && (
          <div className="bg-gradient-to-r from-primary-50 to-green-50 p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-primary-700">
                Mangsa Saat Ini
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-3 sm:mb-0">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-primary-800">
                  {currentMangsa.name}
                </h3>
                <div className="flex items-center mt-1 text-primary-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm sm:text-base">{currentMangsa.period}</span>
                </div>
              </div>
              <div className="flex items-center">
                {getSeasonIcon(currentMangsa.characteristics)}
                <span className="ml-2 text-sm sm:text-base text-primary-700 font-medium">
                  {currentMangsa.farmingStatus}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mangsa Calendar Grid */}
      <div className="bg-white rounded-xl shadow-card p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            12 Mangsa dalam Setahun
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Klik pada setiap mangsa untuk melihat detail informasi pertanian
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {allMangsa.map((mangsa, index) => {
            const isCurrent = currentMangsa?.number === mangsa.number;
            const isSelected = selectedMangsa?.number === mangsa.number;
            
            return (
              <button
                key={mangsa.number}
                onClick={() => setSelectedMangsa(mangsa)}
                className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md transform hover:-translate-y-1 ${
                  getMangsaColor(mangsa, isCurrent)
                } ${isSelected ? 'ring-2 ring-primary-400 ring-offset-2' : ''}`}
              >
                {isCurrent && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full animate-pulse">
                    <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping"></div>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      isCurrent ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {mangsa.number.split(' ')[0]}
                    </span>
                  </div>
                  {!isCurrent && getSeasonIcon(mangsa.characteristics)}
                </div>
                
                <h3 className={`font-semibold text-sm sm:text-base mb-1 ${
                  isCurrent ? 'text-white' : ''
                }`}>
                  {mangsa.name}
                </h3>
                
                <div className={`text-xs mb-2 ${
                  isCurrent ? 'text-white/90' : 'text-gray-600'
                }`}>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {mangsa.period}
                  </div>
                </div>
                
                <p className={`text-xs leading-relaxed line-clamp-2 ${
                  isCurrent ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {mangsa.characteristics}
                </p>
                
                {isCurrent && (
                  <div className="mt-2 text-xs bg-white/20 rounded px-2 py-1 text-white font-medium">
                    🎯 Aktif Sekarang
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Mangsa Details */}
      {selectedMangsa && (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-earth-500 to-earth-600 px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white mr-2" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Detail {selectedMangsa.name}
              </h2>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Characteristics */}
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100">
                <div className="flex items-center mb-3">
                  {getSeasonIcon(selectedMangsa.characteristics)}
                  <h3 className="ml-2 font-semibold text-earth-800">Karakteristik Mangsa</h3>
                </div>
                <p className="text-earth-700 text-sm sm:text-base leading-relaxed">
                  {selectedMangsa.characteristics}
                </p>
              </div>

              {/* Farming Status */}
              <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                <h3 className="font-semibold text-primary-800 mb-3">Status Pertanian</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="ml-2 font-medium text-primary-700">{selectedMangsa.farmingStatus}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Aktivitas:</span>
                    <span className="ml-2 font-medium text-green-700">{selectedMangsa.mainActivity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Indikator Alam</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedMangsa.indicators.map((indicator, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-700 text-sm mb-1">{indicator.name}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{indicator.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Crops */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Tanaman yang Cocok</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedMangsa.suitableCrops.map((crop, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="flex items-start">
                      <Leaf className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-green-700 text-sm">{crop.name}</h4>
                        <p className="text-xs text-green-600 mt-1 leading-relaxed">{crop.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farming Tips */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Tips Pertanian</h3>
              <div className="space-y-2">
                {selectedMangsa.farmingTips.map((tip, index) => (
                  <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex-shrink-0 mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MangsaCalendarDashboard;

export { MangsaCalendarDashboard }