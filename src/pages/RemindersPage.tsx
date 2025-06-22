import { useState, useEffect } from 'react';
import { MangsaInfo, Location } from '../types';
import { getMangsaInfo } from '../utils/mangsaUtils';
import { Bell, Calendar, Plus } from 'lucide-react';

interface RemindersPageProps {
  location: Location;
}

function RemindersPage({ location }: RemindersPageProps) {
  const [reminderType, setReminderType] = useState<'auto' | 'custom'>('auto');
  const [mangsaInfo, setMangsaInfo] = useState<MangsaInfo | null>(null);

  useEffect(() => {
    async function fetchMangsa() {
      const result = await getMangsaInfo(new Date(), location);
      setMangsaInfo(result);
    }
    fetchMangsa();
  }, [location]);

  const autoReminders = mangsaInfo ? [
    {
      id: 1,
      title: `Awal ${mangsaInfo.name}`,
      description: 'Persiapan lahan untuk musim tanam',
      date: mangsaInfo.period.split(' - ')[0],
      type: 'mangsa'
    },
    {
      id: 2,
      title: 'Prakiraan Hujan Tinggi',
      description: 'Persiapkan drainase lahan untuk menghindari banjir',
      date: '15 Mei 2025',
      type: 'weather'
    },
    {
      id: 3,
      title: `Akhir ${mangsaInfo.name}`,
      description: 'Persiapan untuk transisi ke mangsa berikutnya',
      date: mangsaInfo.period.split(' - ')[1],
      type: 'mangsa'
    }
  ] : [];

  const customReminders = [
    {
      id: 4,
      title: 'Penyuluhan Tani',
      description: `Penyuluhan di Balai Desa ${location.city}`,
      date: '20 Mei 2025',
      type: 'custom'
    },
    {
      id: 5,
      title: 'Panen Padi',
      description: 'Panen padi di lahan utara',
      date: '25 Mei 2025',
      type: 'custom'
    }
  ];

  const activeReminders = reminderType === 'auto' ? autoReminders : customReminders;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="bg-secondary-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-white" />
            <h1 className="ml-2 text-2xl font-display text-white">Pengingat</h1>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                reminderType === 'auto'
                  ? 'border-secondary-500 text-secondary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setReminderType('auto')}
            >
              Otomatis
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                reminderType === 'custom'
                  ? 'border-secondary-500 text-secondary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setReminderType('custom')}
            >
              Kustom
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeReminders.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">Tidak ada pengingat</p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pengingat
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {activeReminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{reminder.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        reminder.type === 'mangsa'
                          ? 'bg-primary-100 text-primary-700'
                          : reminder.type === 'weather'
                          ? 'bg-secondary-100 text-secondary-700'
                          : 'bg-earth-100 text-earth-700'
                      }`}
                    >
                      {reminder.type === 'mangsa'
                        ? 'Mangsa'
                        : reminder.type === 'weather'
                        ? 'Cuaca'
                        : 'Kustom'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {reminder.date}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {reminderType === 'auto' && (
            <p className="mt-4 text-center text-xs text-gray-500">
              Pengingat otomatis dibuat berdasarkan data Pranata Mangsa dan prakiraan cuaca
            </p>
          )}

          {reminderType === 'custom' && (
            <button className="mt-4 w-full py-2 bg-secondary-50 hover:bg-secondary-100 text-secondary-600 rounded-md border border-secondary-100 flex items-center justify-center text-sm font-medium">
              <Plus className="h-4 w-4 mr-1" />
              Tambah Pengingat Baru
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RemindersPage;