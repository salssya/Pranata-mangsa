import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Calendar } from 'lucide-react';
import ProvinceCard from '../components/Location/ProvinceCard';
import CityCard from '../components/Location/CityCard';

function LocationSelectionPage() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const cityCoordinates: Record<string, { lat: number, lon: number }> = {
  gresik: { lat: -7.1621, lon: 112.6526 },
  yogyakarta: { lat: -7.7828, lon: 110.3608 }
};

  const provinces = [
    { id: 'jatim', name: 'Jawa Timur' },
    { id: 'jateng', name: 'Jawa Tengah' }
  ];

  const cities = {
    jatim: [
      { id: 'gresik', name: 'Gresik' }
    ],
    jateng: [
      { id: 'yogyakarta', name: 'Yogyakarta' }
    ]
  };

  const handleProvinceSelect = (provinceId: string, provinceName: string) => {
    setSelectedProvince(provinceName);
    setSelectedCity('');
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
  };

const handleContinue = () => {
  if (selectedProvince && selectedCity) {
    const coordinates = cityCoordinates[selectedCity.toLowerCase()];

    if (!coordinates) {
      alert('Koordinat tidak ditemukan untuk kota ini.');
      return;
    }

    navigate('/dashboard/prediction', {
      state: {
        location: {
          province: selectedProvince,
          city: selectedCity,
          lat: coordinates.lat,
          lon: coordinates.lon
        }
      }
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-2">Silakan Pilih Lokasi Anda</h2>
          <p className="text-white/90 text-lg">
            Lokasi ini akan digunakan untuk memberikan prediksi Pranata Mangsa yang akurat berdasarkan cuaca lokal
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50">
          <div className="space-y-6">
            {/* Province Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">1. Pilih Provinsi</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {provinces.map((province) => (
                  <ProvinceCard
                    key={province.id}
                    name={province.name}
                    isSelected={selectedProvince === province.name}
                    onClick={() => handleProvinceSelect(province.id, province.name)}
                  />
                ))}
              </div>
            </div>

            {/* City Selection */}
            {selectedProvince && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">2. Pilih Kota/Kabupaten</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cities[provinces.find(p => p.name === selectedProvince)?.id as keyof typeof cities]?.map((city) => (
                    <CityCard
                      key={city.id}
                      name={city.name}
                      isSelected={selectedCity === city.name}
                      onClick={() => handleCitySelect(city.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {selectedProvince && selectedCity && (
              <div className="p-4 border rounded-xl bg-gradient-to-r from-primary-100 to-blue-50 border-primary-300 text-primary-800 shadow-inner">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <p className="font-medium text-sm">
                    Lokasi terpilih: <strong>{selectedCity}, {selectedProvince}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!selectedProvince || !selectedCity}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center shadow-lg ${
                selectedProvince && selectedCity
                  ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white hover:shadow-2xl hover:-translate-y-1 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Masuk ke Kalender Pranata Mangsa
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationSelectionPage;
