import { Location } from '../types';

export async function getPredictionLiveFromBackend(location: Location) {
  const response = await fetch(
    `http://127.0.0.1:5000/predict-live?lat=${location.lat}&lon=${location.lon}`
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
    `http://127.0.0.1:5000/weather-data?lat=${location.lat}&lon=${location.lon}`
  );

  if (!response.ok) {
    throw new Error("Gagal memuat data cuaca dari backend");
  }

  const data = await response.json();
  return data;
}