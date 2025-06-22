import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MangsaPage from './MangsaPage';
import AboutPage from './AboutPage';
import MangsaCalendarPage from './MangsaCalendarPage';
import WeatherPage from './WeatherPage';
import RecommendationsPage from './RecommendationsPage';
import { Location } from '../types';

function DashboardPage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    province: 'Jawa Timur',
    city: 'Gresik'
  });

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
    // Close sidebar on mobile after location change
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header 
        user={user} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            <Routes>
              {/* Default route now goes to calendar */}
              <Route index element={<MangsaCalendarPage location={selectedLocation} />} />
              <Route path="prediction" element={<MangsaPage location={selectedLocation} />} />
              <Route path="about" element={<AboutPage location={selectedLocation} />} />
              <Route path="weather" element={<WeatherPage location={selectedLocation} />} />
              <Route path="recommendations" element={<RecommendationsPage location={selectedLocation} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;