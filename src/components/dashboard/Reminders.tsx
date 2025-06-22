import { Bell, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MangsaInfo, Location } from '../../types';
import { getCurrentMangsa, getAllMangsaInfo } from '../../utils/mangsaUtils';

interface RemindersProps {
  mangsaInfo: MangsaInfo | null;
  location: Location;
}

function Reminders({ mangsaInfo, location }: RemindersProps) {
  const [allMangsa] = useState(getAllMangsaInfo());
  const [currentMangsa, setCurrentMangsa] = useState<MangsaInfo | null>(null);
  
  useEffect(() => {
    const current = getCurrentMangsa(new Date());
    setCurrentMangsa(current);
  }, []);
  
  if (!mangsaInfo || !currentMangsa) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 animate-pulse h-64">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Generate reminders based on mangsa characteristics
  const generateMangsaReminders = () => {
    const reminders = [];
    const currentIndex = allMangsa.findIndex(m => m.number === currentMangsa.number);
    
    // Current mangsa reminder
    reminders.push({
      id: 1,
      title: `${currentMangsa.name} - Aktivitas Utama`,
      description: currentMangsa.mainActivity,
      date: currentMangsa.period.split(' - ')[0],
      type: 'mangsa',
      priority: 'high'
    });

    // Next mangsa preparation
    const nextIndex = (currentIndex + 1) % allMangsa.length;
    const nextMangsa = allMangsa[nextIndex];
    reminders.push({
      id: 2,
      title: `Persiapan ${nextMangsa.name}`,
      description: `Siapkan untuk transisi ke ${nextMangsa.name}`,
      date: nextMangsa.period.split(' - ')[0],
      type: 'preparation',
      priority: 'medium'
    });

    // Farming tips as reminders
    currentMangsa.farmingTips.forEach((tip, index) => {
      reminders.push({
        id: 3 + index,
        title: `Tips Pertanian ${currentMangsa.name}`,
        description: tip,
        date: 'Berlaku sekarang',
        type: 'tip',
        priority: 'low'
      });
    });

    return reminders;
  };

  const mangsaReminders = generateMangsaReminders();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mangsa':
        return '🌾';
      case 'preparation':
        return '⚡';
      case 'tip':
        return '💡';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="bg-secondary-500 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-white" />
          <h2 className="ml-2 text-xl font-semibold text-white">Pengingat Mangsa</h2>
        </div>
        <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
          {location.city}
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Berdasarkan {currentMangsa.name}
          </h3>
          <p className="text-sm text-gray-600">
            Pengingat otomatis berdasarkan karakteristik mangsa saat ini
          </p>
        </div>

        {mangsaReminders.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Tidak ada pengingat</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {mangsaReminders.slice(0, 5).map((reminder) => (
              <li 
                key={reminder.id} 
                className={`rounded-lg p-4 border transition-all duration-200 hover:shadow-md ${getPriorityColor(reminder.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <span className="text-lg mr-3 mt-0.5">{getTypeIcon(reminder.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{reminder.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{reminder.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {reminder.date}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    reminder.priority === 'high' ? 'bg-red-200 text-red-800' :
                    reminder.priority === 'medium' ? 'bg-amber-200 text-amber-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {reminder.priority === 'high' ? 'Penting' :
                     reminder.priority === 'medium' ? 'Sedang' : 'Info'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Pengingat dibuat berdasarkan karakteristik dan tips dari {currentMangsa.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reminders;