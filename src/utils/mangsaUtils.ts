import { MangsaInfo, Location } from '../types';
import { getPredictionLiveFromBackend } from './PredictUtils';
import { getWeatherData } from './weatherUtils';

const mangsaData: MangsaInfo[] = [
  {
    number: 'I',
    name: 'Mangsa Kasa',
    period: '22 Juni - 1 Agustus',
    characteristics: 'Daun-daun mulai berguguran. Tanah mulai retak-retak. Musim kemarau dimulai.',
    indicators: [
      { name: 'Cuaca', description: 'Kering, suhu mulai naik' },
      { name: 'Tanah', description: 'Mulai retak-retak' },
      { name: 'Tanaman', description: 'Daun berguguran' }
    ],
    suitableCrops: [
      { name: 'Palawija', description: 'Jagung, kedelai, kacang tanah' },
      { name: 'Sayuran', description: 'Terong, cabai, tomat' }
    ],
    farmingStatus: 'Musim Kemarau',
    mainActivity: 'Persiapan lahan kering',
    farmingTips: [
      'Siapkan irigasi cadangan',
      'Pilih varietas tahan kekeringan',
      'Gunakan mulsa untuk mengurangi penguapan'
    ]
  },
  {
    number: 'II',
    name: 'Mangsa Karo',
    period: '2 Agustus - 24 September',
    characteristics: 'Musim kemarau puncak. Tanah sangat kering. Angin kencang bertiup.',
    indicators: [
      { name: 'Cuaca', description: 'Sangat kering dan panas' },
      { name: 'Tanah', description: 'Retak-retak dalam' },
      { name: 'Angin', description: 'Kencang dan kering' }
    ],
    suitableCrops: [
      { name: 'Tanaman Tahan Kering', description: 'Singkong, ubi jalar' },
      { name: 'Sayuran Hardy', description: 'Kangkung, bayam' }
    ],
    farmingStatus: 'Kemarau Puncak',
    mainActivity: 'Pemeliharaan tanaman tahan kering',
    farmingTips: [
      'Penyiraman intensif di pagi dan sore',
      'Gunakan naungan untuk tanaman sensitif',
      'Simpan air hujan untuk cadangan'
    ]
  },
  {
    number: 'III',
    name: 'Mangsa Katelu',
    period: '25 Agustus - 17 September',
    characteristics: 'Akhir musim kemarau. Mulai ada tanda-tanda hujan. Udara mulai lembab.',
    indicators: [
      { name: 'Cuaca', description: 'Mulai berawan' },
      { name: 'Udara', description: 'Kelembaban meningkat' },
      { name: 'Angin', description: 'Mulai berubah arah' }
    ],
    suitableCrops: [
      { name: 'Persiapan Padi', description: 'Pembibitan padi' },
      { name: 'Sayuran Musim Hujan', description: 'Persiapan lahan sayuran' }
    ],
    farmingStatus: 'Transisi ke Musim Hujan',
    mainActivity: 'Persiapan musim tanam',
    farmingTips: [
      'Siapkan bibit untuk musim hujan',
      'Perbaiki saluran irigasi',
      'Bersihkan lahan dari gulma'
    ]
  },
  {
    number: 'IV',
    name: 'Mangsa Kapat',
    period: '18 September - 12 Oktober',
    characteristics: 'Awal musim hujan. Hujan mulai turun tidak teratur. Tanah mulai basah.',
    indicators: [
      { name: 'Cuaca', description: 'Hujan tidak teratur' },
      { name: 'Tanah', description: 'Mulai lembab' },
      { name: 'Tanaman', description: 'Mulai tumbuh tunas baru' }
    ],
    suitableCrops: [
      { name: 'Padi', description: 'Mulai tanam padi' },
      { name: 'Jagung', description: 'Tanam jagung musim hujan' }
    ],
    farmingStatus: 'Awal Musim Hujan',
    mainActivity: 'Mulai penanaman',
    farmingTips: [
      'Tanam segera setelah hujan pertama',
      'Pastikan drainase baik',
      'Pilih varietas sesuai curah hujan'
    ]
  },
  {
    number: 'V',
    name: 'Mangsa Kalima',
    period: '13 Oktober - 8 November',
    characteristics: 'Musim hujan mulai teratur. Curah hujan meningkat. Tanaman tumbuh subur.',
    indicators: [
      { name: 'Cuaca', description: 'Hujan teratur' },
      { name: 'Tanah', description: 'Basah dan subur' },
      { name: 'Tanaman', description: 'Pertumbuhan pesat' }
    ],
    suitableCrops: [
      { name: 'Padi', description: 'Masa pertumbuhan vegetatif' },
      { name: 'Sayuran Hijau', description: 'Sawi, selada, kangkung' }
    ],
    farmingStatus: 'Musim Hujan Aktif',
    mainActivity: 'Pemeliharaan tanaman',
    farmingTips: [
      'Lakukan penyiangan rutin',
      'Berikan pupuk sesuai kebutuhan',
      'Kontrol hama dan penyakit'
    ]
  },
  {
    number: 'VI',
    name: 'Mangsa Kanem',
    period: '9 November - 21 Desember',
    characteristics: 'Puncak musim hujan. Curah hujan tinggi. Risiko banjir meningkat.',
    indicators: [
      { name: 'Cuaca', description: 'Hujan deras dan sering' },
      { name: 'Air', description: 'Genangan di mana-mana' },
      { name: 'Tanaman', description: 'Risiko busuk akar' }
    ],
    suitableCrops: [
      { name: 'Padi Sawah', description: 'Cocok untuk padi sawah' },
      { name: 'Ikan', description: 'Budidaya ikan di sawah' }
    ],
    farmingStatus: 'Puncak Musim Hujan',
    mainActivity: 'Pengelolaan air',
    farmingTips: [
      'Pastikan drainase lancar',
      'Waspada serangan hama',
      'Lindungi tanaman dari hujan berlebih'
    ]
  },
  {
    number: 'VII',
    name: 'Mangsa Kapitu',
    period: '22 Desember - 2 Februari',
    characteristics: 'Hujan deras. Sungai-sungai banjir. Banyak petir dan angin kencang.',
    indicators: [
      { name: 'Cuaca', description: 'Hujan lebat, petir' },
      { name: 'Sungai', description: 'Meluap dan banjir' },
      { name: 'Angin', description: 'Kencang dan berbahaya' }
    ],
    suitableCrops: [
      { name: 'Tanaman Air', description: 'Eceng gondok, teratai' },
      { name: 'Padi Tahan Banjir', description: 'Varietas padi rawa' }
    ],
    farmingStatus: 'Musim Hujan Ekstrem',
    mainActivity: 'Proteksi tanaman',
    farmingTips: [
      'Buat pematang tinggi',
      'Siapkan pompa air',
      'Hindari aktivitas di lahan terbuka'
    ]
  },
  {
    number: 'VIII',
    name: 'Mangsa Kawolu',
    period: '3 Februari - 28 Februari',
    characteristics: 'Hujan mulai berkurang. Cuaca mulai cerah. Tanaman mulai berbunga.',
    indicators: [
      { name: 'Cuaca', description: 'Hujan berkurang' },
      { name: 'Matahari', description: 'Mulai sering muncul' },
      { name: 'Tanaman', description: 'Fase berbunga' }
    ],
    suitableCrops: [
      { name: 'Padi', description: 'Masa pembungaan padi' },
      { name: 'Buah-buahan', description: 'Mangga, rambutan mulai berbuah' }
    ],
    farmingStatus: 'Transisi Hujan-Kemarau',
    mainActivity: 'Perawatan pembungaan',
    farmingTips: [
      'Kurangi pemberian air',
      'Berikan pupuk kalium',
      'Lindungi bunga dari hujan'
    ]
  },
  {
    number: 'IX',
    name: 'Mangsa Kasanga',
    period: '1 Maret - 25 Maret',
    characteristics: 'Akhir musim hujan. Cuaca cerah. Tanaman mulai matang.',
    indicators: [
      { name: 'Cuaca', description: 'Cerah dan hangat' },
      { name: 'Tanah', description: 'Mulai mengering' },
      { name: 'Tanaman', description: 'Matang dan siap panen' }
    ],
    suitableCrops: [
      { name: 'Padi', description: 'Masa pematangan bulir' },
      { name: 'Palawija', description: 'Jagung, kedelai siap panen' }
    ],
    farmingStatus: 'Masa Pematangan',
    mainActivity: 'Persiapan panen',
    farmingTips: [
      'Kurangi pengairan',
      'Pantau tingkat kematangan',
      'Siapkan alat panen'
    ]
  },
  {
    number: 'X',
    name: 'Mangsa Kasadasa',
    period: '26 Maret - 18 April',
    characteristics: 'Musim panen tiba. Cuaca kering dan cerah. Angin bertiup dari timur.',
    indicators: [
      { name: 'Cuaca', description: 'Kering dan cerah' },
      { name: 'Angin', description: 'Bertiup dari timur' },
      { name: 'Tanaman', description: 'Siap dipanen' }
    ],
    suitableCrops: [
      { name: 'Padi', description: 'Panen raya padi' },
      { name: 'Jagung', description: 'Panen jagung' }
    ],
    farmingStatus: 'Musim Panen',
    mainActivity: 'Panen dan pengeringan',
    farmingTips: [
      'Panen di pagi hari',
      'Keringkan hasil panen',
      'Simpan dengan baik'
    ]
  },
  {
    number: 'XI',
    name: 'Mangsa Dhesta',
    period: '19 April - 11 Mei',
    characteristics: 'Panen selesai. Lahan kosong. Persiapan untuk siklus berikutnya.',
    indicators: [
      { name: 'Lahan', description: 'Kosong setelah panen' },
      { name: 'Cuaca', description: 'Kering dan stabil' },
      { name: 'Petani', description: 'Istirahat dan persiapan' }
    ],
    suitableCrops: [
      { name: 'Tanaman Penutup', description: 'Legum penutup tanah' },
      { name: 'Sayuran Cepat', description: 'Bayam, kangkung' }
    ],
    farmingStatus: 'Masa Istirahat Lahan',
    mainActivity: 'Persiapan lahan baru',
    farmingTips: [
      'Biarkan lahan beristirahat',
      'Tanam tanaman penutup',
      'Perbaiki infrastruktur pertanian'
    ]
  },
  {
    number: 'XII',
    name: 'Mangsa Sadha',
    period: '12 Mei - 21 Juni',
    characteristics: 'Musim kemarau mulai. Tanah mulai mengering. Angin bertiup dari timur ke barat.',
    indicators: [
      { name: 'Cuaca', description: 'Cerah, angin timur' },
      { name: 'Tanah', description: 'Mulai mengering' },
      { name: 'Tanaman', description: 'Padi menguning' }
    ],
    suitableCrops: [
      { name: 'Padi', description: 'Masa panen raya' },
      { name: 'Palawija', description: 'Persiapan tanam palawija' }
    ],
    farmingStatus: 'Musim Panen',
    mainActivity: 'Panen padi dan persiapan palawija',
    farmingTips: [
      'Lakukan panen di pagi hari',
      'Keringkan gabah dengan baik',
      'Siapkan lahan untuk palawija'
    ]
  }
];

// Mapping dari hasil ML (1-12) ke index array (0-11)
const mlToMangsaMapping: Record<number, number> = {
  1: 0,   // ML prediction 1 → Mangsa Kasa (index 0)
  2: 1,   // ML prediction 2 → Mangsa Karo (index 1)  
  3: 2,   // ML prediction 3 → Mangsa Katelu (index 2)
  4: 3,   // ML prediction 4 → Mangsa Kapat (index 3)
  5: 4,   // ML prediction 5 → Mangsa Kalima (index 4)
  6: 5,   // ML prediction 6 → Mangsa Kanem (index 5)
  7: 6,   // ML prediction 7 → Mangsa Kapitu (index 6)
  8: 7,   // ML prediction 8 → Mangsa Kawolu (index 7)
  9: 8,   // ML prediction 9 → Mangsa Kasanga (index 8)
  10: 9,  // ML prediction 10 → Mangsa Kasadasa (index 9)
  11: 10, // ML prediction 11 → Mangsa Dhesta (index 10)
  12: 11  // ML prediction 12 → Mangsa Sadha (index 11)
};

export function getAllMangsaInfo(): MangsaInfo[] {
  return mangsaData;
}

/**
 * Mendapatkan informasi mangsa berdasarkan prediksi ML dan data cuaca
 * @param location Lokasi untuk mendapatkan data cuaca
 * @returns Promise<MangsaInfo> Informasi mangsa yang diprediksi
 */
export async function getMangsaInfoWithML(location: Location): Promise<MangsaInfo> {
  try {
    // Mapping koordinat berdasarkan kota
    const coordinateMap: Record<string, { lat: number; lon: number }> = {
      "Gresik": { lat: -7.1568, lon: 112.6514 },
      "Yogyakarta": { lat: -7.7970, lon: 110.3705 },
    };

    const coords = coordinateMap[location.city] || { lat: location.lat, lon: location.lon };
    
    // Ambil data cuaca
    const weatherData = await getWeatherData(coords.lat, coords.lon);
    
    // Siapkan features untuk ML
    const features = [
      weatherData.temperature,
      weatherData.humidity,
      weatherData.windDirection,
      weatherData.windSpeed,
      weatherData.rainfall.morning || 0, // atau total rainfall jika perlu
    ];

// Dapatkan prediksi dari ML
const mlPrediction = await getPredictionLiveFromBackend(features);

// Log the prediction for debugging
console.log('ML Prediction:', mlPrediction);

// Mapping dari hasil ML ke data mangsa
const mangsaIndex = mlToMangsaMapping[mlPrediction];

if (mangsaIndex !== undefined && mangsaData[mangsaIndex]) {
  return {
    ...mangsaData[mangsaIndex],
    // Tambahkan data cuaca untuk referensi
    weatherContext: {
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      condition: weatherData.condition,
      predictedBy: 'ML Model'
    }
  };
} else {
  // Fallback jika prediksi ML tidak valid
  console.warn(`Invalid ML prediction: ${mlPrediction}, using calendar-based mangsa`);
  return getCurrentMangsa(new Date());
}

    
  } catch (error) {
    console.error('Error getting ML-based mangsa prediction:', error);
    // Fallback ke sistem kalender tradisional
    return getCurrentMangsa(new Date());
  }
}

/**
 * Fungsi backward compatibility - tetap bisa digunakan dengan date/location
 */
export function getMangsaInfo(date: Date, location: Location): MangsaInfo {
  return getCurrentMangsa(date);
}

/**
 * Mendapatkan mangsa berdasarkan kalender tradisional (tanpa ML)
 */
export function getCurrentMangsa(date: Date): MangsaInfo {
  const year = date.getFullYear();
  const month = date.getMonth(); 
  const day = date.getDate();

  const checkInRange = (start: [number, number], end: [number, number]): boolean => {
    const startDate = new Date(year, start[0], start[1]);
    const endDate = new Date(year, end[0], end[1]);
    return date >= startDate && date <= endDate;
  };

  if (checkInRange([4, 12], [5, 21])) return mangsaData[11]; // Sadha: 12 May - 21 June
  if (checkInRange([5, 22], [7, 1])) return mangsaData[0];   // Kasa: 22 June - 1 Aug
  if (checkInRange([6, 2], [7, 24])) return mangsaData[1];   // Karo: 2 Aug - 24 Sep
  if (checkInRange([7, 25], [8, 17])) return mangsaData[2];  // Katelu: 25 Aug - 17 Oct
  if (checkInRange([8, 18], [9, 12])) return mangsaData[3];  // Kapat: 18 Sep - 12 Oct
  if (checkInRange([9, 13], [10, 8])) return mangsaData[4];  // Kalima: 13 Oct - 8 Nov
  if (checkInRange([10, 9], [11, 21])) return mangsaData[5]; // Kanem: 9 Nov - 21 Dec
  if (checkInRange([11, 22], [1, 2])) return mangsaData[6];  // Kapitu: 22 Dec - 2 Feb
  if (checkInRange([1, 3], [1, 28])) return mangsaData[7];   // Kawolu: 3 Feb - 28 Feb
  if (checkInRange([2, 1], [2, 25])) return mangsaData[8];   // Kasanga: 1 Mar - 25 Mar
  if (checkInRange([2, 26], [3, 18])) return mangsaData[9];  // Kasadasa: 26 Mar - 18 Apr
  if (checkInRange([3, 19], [4, 11])) return mangsaData[10]; // Dhesta: 19 Apr - 11 May

  return mangsaData[11];
}

/**
 * Membandingkan hasil prediksi ML dengan kalender tradisional
 */
export async function comparePredictions(location: Location): Promise<{
  mlBased: MangsaInfo;
  calendarBased: MangsaInfo;
  isMatching: boolean;
  confidence: 'high' | 'medium' | 'low';
}> {
  const mlBased = await getMangsaInfoWithML(location);
  const calendarBased = getCurrentMangsa(new Date());
  
  const isMatching = mlBased.number === calendarBased.number;
  
  // Hitung confidence berdasarkan kesamaan karakteristik cuaca
  let confidence: 'high' | 'medium' | 'low' = 'medium';
  
  if (isMatching) {
    confidence = 'high';
  } else {
    // Cek apakah mangsa yang diprediksi ML masih dalam range yang reasonable
    const mlIndex = mlToMangsaMapping[parseInt(mlBased.number.replace(/[^\d]/g, ''))];
    const calIndex = mlToMangsaMapping[parseInt(calendarBased.number.replace(/[^\d]/g, ''))];
    
    const diff = Math.abs(mlIndex - calIndex);
    if (diff <= 1) {
      confidence = 'medium';
    } else {
      confidence = 'low';
    }
  }
  
  return {
    mlBased,
    calendarBased,
    isMatching,
    confidence
  };
}