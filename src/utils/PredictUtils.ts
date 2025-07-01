import { Location } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function getPredictionLiveFromBackend(location: Location) {
  const response = await fetch(
    `${API_BASE_URL}/predict-live?lat=${location.lat}&lon=${location.lon}`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data prediksi");
  }

  const data = await response.json();

  return {
    features: data.features,
    aiPrediction: data.prediction_ai,
    datePrediction: data.prediction_by_date,
    usedPrediction: data.used_by_frontend,
    location: data.location,
    dasarianFeatures: data.features // Raw features untuk ditampilkan
  };
}
