import { BookOpen, Calendar, Brain, Leaf, Users, History, Target, TrendingUp } from 'lucide-react';
import { Location } from '../types';

interface AboutPageProps {
  location: Location;
}

function AboutPage({ location }: AboutPageProps) {
  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-green-600 rounded-2xl shadow-card overflow-hidden">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute top-16 right-12 w-8 h-8 border border-white rounded-full"></div>
            <div className="absolute bottom-12 left-16 w-12 h-12 border border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          {/* What is Pranata Mangsa */}
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <History className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Apa itu Pranata Mangsa?</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Pranata Mangsa</strong> adalah sistem kalender tradisional Jawa yang membagi satu tahun menjadi 
                <strong> 12 periode (mangsa)</strong>. Setiap mangsa memiliki karakteristik cuaca dan petunjuk alam 
                yang membantu petani menentukan waktu yang tepat untuk bercocok tanam.
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                Sistem ini dikembangkan oleh <strong>Sultan Agung</strong> dari Kerajaan Mataram pada abad ke-17, 
                berdasarkan pengamatan mendalam terhadap pola alam, cuaca, dan siklus pertanian di Pulau Jawa.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Hingga kini, Pranata Mangsa masih digunakan oleh petani Jawa karena terbukti akurat dalam 
                memprediksi pola cuaca dan menentukan waktu tanam yang optimal.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Filosofi dan Kearifan</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">🌱 Harmoni dengan Alam</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pranata Mangsa mengajarkan petani untuk hidup selaras dengan ritme alam, 
                  bukan melawan atau memaksakan kehendak terhadap alam.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">⏰ Ketepatan Waktu</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Setiap aktivitas pertanian memiliki waktu yang tepat. Pranata Mangsa membantu 
                  petani menentukan kapan harus menanam, merawat, dan memanen.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">🔄 Siklus Berkelanjutan</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sistem ini menekankan pentingnya menjaga keseimbangan ekosistem untuk 
                  pertanian yang berkelanjutan dari generasi ke generasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Visual Content */}
        <div className="space-y-6">
          {/* Traditional Image */}
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Kalender Pranata Mangsa Tradisional
              </h3>
            </div>
            <div className="relative">
              <img 
                src="https://rikejokanan.files.wordpress.com/2021/08/img_0403.jpg" 
                alt="Kalender Pranata Mangsa Tradisional"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                Kalender tradisional yang menunjukkan 12 mangsa dengan karakteristik masing-masing
              </p>
            </div>
          </div>

          {/* Modern Innovation */}
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Inovasi Modern</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <Brain className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-800">Prediksi AI dengan Model LVQ</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  Menggunakan machine learning untuk prediksi mangsa berdasarkan data cuaca real-time
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-800">Data Cuaca Real-time</h3>
                </div>
                <p className="text-green-700 text-sm">
                  Integrasi dengan OpenWeatherMap untuk akurasi prediksi yang lebih tinggi
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-800">Lokasi Spesifik</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  Prediksi disesuaikan dengan kondisi geografis Gresik dan Yogyakarta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 12 Mangsa Overview */}
      <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-3">
            12 Mangsa dalam Setahun
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Setiap mangsa memiliki karakteristik unik yang memandu aktivitas pertanian
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { number: 'I', name: 'Kasa', period: 'Jun-Agu', type: 'kemarau' },
            { number: 'II', name: 'Karo', period: 'Agu-Sep', type: 'kemarau' },
            { number: 'III', name: 'Katelu', period: 'Agu-Sep', type: 'transisi' },
            { number: 'IV', name: 'Kapat', period: 'Sep-Okt', type: 'hujan' },
            { number: 'V', name: 'Kalima', period: 'Okt-Nov', type: 'hujan' },
            { number: 'VI', name: 'Kanem', period: 'Nov-Des', type: 'hujan' },
            { number: 'VII', name: 'Kapitu', period: 'Des-Feb', type: 'hujan' },
            { number: 'VIII', name: 'Kawolu', period: 'Feb-Feb', type: 'transisi' },
            { number: 'IX', name: 'Kasanga', period: 'Mar-Mar', type: 'transisi' },
            { number: 'X', name: 'Kasadasa', period: 'Mar-Apr', type: 'panen' },
            { number: 'XI', name: 'Dhesta', period: 'Apr-Mei', type: 'istirahat' },
            { number: 'XII', name: 'Sadha', period: 'Mei-Jun', type: 'panen' }
          ].map((mangsa, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              mangsa.type === 'kemarau' ? 'bg-amber-50 border-amber-200' :
              mangsa.type === 'hujan' ? 'bg-blue-50 border-blue-200' :
              mangsa.type === 'transisi' ? 'bg-green-50 border-green-200' :
              mangsa.type === 'panen' ? 'bg-purple-50 border-purple-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                  mangsa.type === 'kemarau' ? 'bg-amber-200 text-amber-800' :
                  mangsa.type === 'hujan' ? 'bg-blue-200 text-blue-800' :
                  mangsa.type === 'transisi' ? 'bg-green-200 text-green-800' :
                  mangsa.type === 'panen' ? 'bg-purple-200 text-purple-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {mangsa.number}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{mangsa.name}</h3>
                <p className="text-xs text-gray-600">{mangsa.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-earth-500 to-earth-600 rounded-xl shadow-card p-6 sm:p-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
          Manfaat untuk Petani Modern
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Meningkatkan Produktivitas</h3>
            <p className="text-white/80 text-sm">
              Waktu tanam yang tepat menghasilkan panen yang lebih optimal
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Ramah Lingkungan</h3>
            <p className="text-white/80 text-sm">
              Pertanian berkelanjutan yang menjaga keseimbangan ekosistem
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Teknologi Modern</h3>
            <p className="text-white/80 text-sm">
              Kombinasi kearifan tradisional dengan prediksi AI yang akurat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;