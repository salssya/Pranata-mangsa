import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
  <div
    className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white text-center p-6"
    style={{
      backgroundImage: `
        linear-gradient(to bottom right, rgba(46, 125, 50, 0.8), rgba(27, 94, 32, 0.8)),
        url('/background.avif')
      `,
    }}
  >
    <h1 className="text-4xl font-bold mb-4">Selamat Datang di Sistem Kalender Pranata Mangsa Berbasis Machine Learning</h1>
    <p className="text-lg mb-6 max-w-xl">
      Sistem ini memanfaatkan data cuaca dan teknologi machine learning 
      untuk membantu petani menentukan waktu tanam terbaik sesuai kondisi iklim
      mendukung pengambilan keputusan dalam sistem pertanian berbasis agroklimatologi modern.
    </p>
    <button
      onClick={() => navigate('/select-location')}
      className={`bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 font-semibold text-white px-6 py-3 rounded-full shadow hover:opacity-80 transition`}
    >
      Lanjut Pilih Lokasi
    </button>
  </div>
);

}

export default WelcomePage;
