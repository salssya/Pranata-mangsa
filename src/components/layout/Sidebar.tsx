import {
  XCircle, Home, Info, Calendar, CloudRain, Sprout,
  MapPin, ChevronDown, Brain
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Location } from '../../types';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
}

function Sidebar({ isOpen, onClose, selectedLocation, onLocationChange }: SidebarProps) {
  const location = useLocation();
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);

  const provinces = ['Jawa Timur', 'Jawa Tengah'];
  const cities = {
    'Jawa Timur': ['Gresik'],
    'Jawa Tengah': ['Yogyakarta']
  };

  // ✅ Daftar lokasi lengkap dengan lat dan lon
  const locationOptions: Location[] = [
    { province: 'Jawa Timur', city: 'Gresik', lat: -7.1621, lon: 112.6526 },
    { province: 'Jawa Tengah', city: 'Yogyakarta', lat: -7.801194, lon: 110.364917 },
  ];

  const navigationItems = [
    { name: 'Prediksi Mangsa', icon: Brain, path: '/dashboard/prediction', color: 'text-purple-600' },
    { name: 'Tentang Pranata Mangsa', icon: Info, path: '/dashboard/about', color: 'text-blue-600' },
    { name: 'Kalender Pranata Mangsa', icon: Calendar, path: '/dashboard', color: 'text-primary-600' },
    { name: 'Informasi Cuaca', icon: CloudRain, path: '/dashboard/weather', color: 'text-blue-600' },
    { name: 'Rekomendasi Tanam', icon: Sprout, path: '/dashboard/recommendations', color: 'text-green-600' }
  ];

  // ✅ Ganti provinsi = pilih kota pertama dari provinsi itu
  const handleProvinceChange = (province: string) => {
    const firstCity = cities[province as keyof typeof cities][0];
    const found = locationOptions.find(loc => loc.province === province && loc.city === firstCity);
    if (found) onLocationChange(found);
  };

  // ✅ Ganti kota = cari lokasi lengkap berdasarkan kota dan provinsi
  const handleCityChange = (city: string) => {
    const found = locationOptions.find(loc => loc.province === selectedLocation.province && loc.city === city);
    if (found) onLocationChange(found);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed md:sticky top-0 z-30 md:z-0 h-full w-64 sm:w-72 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } bg-white border-r border-gray-200 md:block flex-shrink-0 shadow-lg md:shadow-none`}>
        <div className="h-full flex flex-col">
          {/* Mobile header */}
          <div className="pt-4 pb-3 flex justify-between items-center px-4 md:hidden border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu Navigasi</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Location Selector */}
          <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsLocationExpanded(!isLocationExpanded)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-primary-500 mr-2" />
                <h3 className="text-sm font-semibold text-gray-700">Lokasi Anda</h3>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isLocationExpanded ? 'rotate-180' : ''}`} />
            </button>

            <div className="mt-2 text-xs text-gray-600">
              📍 {selectedLocation.city}, {selectedLocation.province}
            </div>

            {isLocationExpanded && (
              <div className="mt-3 space-y-3 animate-fade-in">
                <div>
                  <label htmlFor="province" className="block text-xs font-medium text-gray-700 mb-1">
                    Provinsi
                  </label>
                  <select
                    id="province"
                    value={selectedLocation.province}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    className="w-full text-sm rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 bg-white"
                  >
                    {provinces.map((province) => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">
                    Kota/Kabupaten
                  </label>
                  <select
                    id="city"
                    value={selectedLocation.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full text-sm rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 bg-white"
                  >
                    {cities[selectedLocation.province as keyof typeof cities].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Menu Utama
            </div>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                  location.pathname === item.path 
                    ? item.color 
                    : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                <span className="truncate">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Info Card */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-primary-50 to-green-50">
            <div className="bg-white p-3 rounded-lg border border-primary-100 shadow-sm">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Calendar className="h-4 w-4 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-primary-800 mb-1">Sistem Pranata Mangsa</h3>
                  <p className="text-xs text-primary-600 leading-relaxed mb-2">
                    Kearifan lokal Jawa untuk pertanian modern dengan teknologi AI
                  </p>
                  <Link 
                    to="/dashboard/about" 
                    className="inline-flex items-center text-xs font-medium text-primary-700 hover:text-primary-600 transition-colors"
                    onClick={() => window.innerWidth < 768 && onClose()}
                  >
                    Pelajari Lebih Lanjut →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
