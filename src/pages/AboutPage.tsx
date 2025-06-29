import { BookOpen, Users, Brain, Leaf } from 'lucide-react';
import { Location } from '../types';

interface AboutPageProps {
  location: Location;
}

function AboutPage({ location }: AboutPageProps) {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-green-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative p-8 lg:p-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute top-16 right-12 w-8 h-8 border border-white rounded-full"></div>
            <div className="absolute bottom-12 left-16 w-12 h-12 border border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tentang Pranata Mangsa
            </h1>
            <p className="text-primary-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Kearifan lokal Jawa yang memadukan tradisi berabad-abad dengan teknologi AI modern 
              untuk membantu petani Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Filosofi dan Kearifan Lokal */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filosofi dan Kearifan Lokal</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">💡</span> Mengapa penting untuk petani?
              </h3>
              <p className="text-gray-600">
                Sistem ini membantu petani menentukan waktu tanam/panen optimal berdasarkan kearifan lokal yang dikombinasikan dengan data modern.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">🌿</span> Harmoni dengan Alam
              </h3>
              <p className="text-gray-600">
                Mengajarkan untuk hidup selaras dengan ritme alam, bukan melawannya.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">⏰</span> Ketepatan Waktu
              </h3>
              <p className="text-gray-600">
                Menentukan waktu tepat untuk menanam, merawat, dan memanen berdasarkan siklus alam.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">🔁</span> Siklus Berkelanjutan
              </h3>
              <p className="text-gray-600">
                Pertanian tidak hanya untuk hasil saat ini, tapi juga untuk generasi selanjutnya.
              </p>
            </div>
          </div>
        </div>

        {/* Inovasi Modern */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Inovasi Modern</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">🤖</span> Prediksi AI
              </h3>
              <p className="text-gray-600">
                Menggunakan model LVQ untuk prediksi musim tanam berdasarkan data cuaca terkini.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">🌦️</span> Data Real-time
              </h3>
              <p className="text-gray-600">
                Terintegrasi dengan OpenWeatherMap untuk data suhu, hujan, kelembapan, dan angin secara aktual.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">📍</span> Lokasi Spesifik
              </h3>
              <p className="text-gray-600">
                Prediksi disesuaikan dengan kondisi geografis setempat (Gresik & Yogyakarta).
              </p>
            </div>
          </div>
        </div>

        {/* Visual Kalender Pranata Mangsa - Full Width */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-center mb-4">Kalender Pranata Mangsa Tradisional</h3>
            <div className="w-full bg-gray-50 p-4 rounded-lg">
              <img 
                src="https://rikejokanan.files.wordpress.com/2021/08/img_0403.jpg" 
                alt="Kalender Pranata Mangsa Tradisional lengkap dengan 12 periode mangsa"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Kalender tradisional Jawa yang menunjukkan 12 periode mangsa dengan karakteristik masing-masing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-earth-500 to-earth-600 rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Manfaat untuk Petani Modern
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Meningkatkan Produktivitas</h3>
            <p className="text-white/80 text-sm">
              Waktu tanam yang tepat = hasil panen yang lebih optimal
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Ramah Lingkungan</h3>
            <p className="text-white/80 text-sm">
              Pertanian berkelanjutan yang menjaga ekosistem
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Teknologi Modern</h3>
            <p className="text-white/80 text-sm">
              Kearifan tradisional + prediksi AI yang akurat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
