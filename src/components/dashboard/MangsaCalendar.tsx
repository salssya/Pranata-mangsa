import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Info, Clock, Leaf, Sun, CloudRain, Brain } from 'lucide-react';
import { MangsaInfo } from '../../types';

interface MangsaCalendarProps {
  mangsaInfo: MangsaInfo | null;
  isPredicted?: boolean;
}

function MangsaCalendar({ mangsaInfo, isPredicted = false }: MangsaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  if (!mangsaInfo) {
    return (
      <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 animate-pulse h-64">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', { 
      dateStyle: 'full' 
    }).format(date);
  };

  // Get weather icon based on characteristics
  const getSeasonIcon = () => {
    const char = mangsaInfo.characteristics.toLowerCase();
    if (char.includes('hujan') || char.includes('basah')) {
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    } else if (char.includes('kering') || char.includes('kemarau')) {
      return <Sun className="h-5 w-5 text-yellow-500" />;
    }
    return <Leaf className="h-5 w-5 text-green-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          <h2 className="ml-2 text-lg sm:text-xl font-semibold text-white">
            {isPredicted ? 'Prediksi Mangsa AI' : 'Kalender Pranata Mangsa'}
          </h2>
          {isPredicted && (
            <Brain className="h-4 w-4 ml-2 text-white animate-pulse" />
          )}
        </div>
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          {formatDate(currentDate)}
        </span>
      </div>
      
      <div className="p-4 sm:p-6">
        {isPredicted && (
          <div className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center text-blue-700 mb-1">
              <Brain className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Prediksi AI berdasarkan data cuaca real-time</span>
            </div>
            <p className="text-xs text-blue-600">
              Menggunakan model LVQ dengan data: suhu, curah hujan, kelembapan, kecepatan angin, dan arah angin
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="text-xs sm:text-sm text-gray-500 mb-1">
              {isPredicted ? 'Prediksi Mangsa' : 'Mangsa Saat Ini'}
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-primary-700 leading-tight">
              {mangsaInfo.name} 
              <span className="text-sm sm:text-lg font-normal text-primary-500 ml-2 block sm:inline">
                ({mangsaInfo.number})
              </span>
            </h3>
          </div>
          <div className="bg-primary-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary-100">
            <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Periode
            </div>
            <div className="font-medium text-primary-700 text-sm sm:text-base">{mangsaInfo.period}</div>
          </div>
        </div>
        
        <div className="bg-earth-50 p-3 sm:p-4 rounded-lg mb-6 border border-earth-100">
          <div className="flex items-start">
            <div className="flex items-center mr-3 mt-0.5">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-earth-500 mr-2" />
              {getSeasonIcon()}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-earth-800 text-sm sm:text-base mb-1">Karakteristik Mangsa</h4>
              <p className="text-earth-700 text-sm sm:text-base leading-relaxed">{mangsaInfo.characteristics}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mangsaInfo.indicators.map((indicator, index) => (
            <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                <h4 className="font-medium text-gray-700 text-sm sm:text-base">{indicator.name}</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangsaCalendar;