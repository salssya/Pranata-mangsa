import { Location } from '../types';

const API_BASE_URL = 'https://0663-114-10-47-84.ngrok-free.app';

export async function getPredictionLiveFromBackend(location: Location) {
  const response = await fetch(
    `${API_BASE_URL}/predict-live?lat=${location.lat}&lon=${location.lon}`
  );

  if (!response.ok) {
    throw new Error("Gagal memuat prediksi dari backend");
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

export async function getWeatherDataFromBackend(location: Location) {
  const response = await fetch(
    `${API_BASE_URL}/weather-data?lat=${location.lat}&lon=${location.lon}`
  );

  if (!response.ok) {
    throw new Error("Gagal memuat data cuaca dari backend");
  }

  const data = await response.json();
  return data;
}
