import { WeatherData, Location } from '../types';

// GANTI URL INI SESUAI NGROK KAMU
const API_BASE_URL = 'https://0663-114-10-47-84.ngrok-free.app';

// Get coordinates for Indonesian cities
const getCoordinates = (location: Location): { lat: number; lon: number } => {
  const coordinates: Record<string, { lat: number; lon: number }> = {
    'Gresik': { lat: -7.1564, lon: 112.6536 },
    'Yogyakarta': { lat: -7.7956, lon: 110.3695 },
  };
  
  // First try to use city name, then fallback to provided coordinates
  return coordinates[location.city] || { lat: location.lat, lon: location.lon };
};

// Map OpenWeatherMap condition to our condition types
const mapWeatherCondition = (main: string): 'sunny' | 'cloudy' | 'rainy' | 'stormy' => {
  const mainLower = main.toLowerCase();
  if (mainLower.includes('rain') || mainLower.includes('drizzle')) return 'rainy';
  if (mainLower.includes('cloud')) return 'cloudy';
  if (mainLower.includes('thunderstorm')) return 'stormy';
  if (mainLower.includes('clear')) return 'sunny';
  return 'sunny';
};

// Get current weather from OpenWeatherMap API
export const getCurrentWeather = async (lat: number, lon: number) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;
  console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Weather API response:', data);

    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    const windDirection = data.wind.deg || 0;
    const description = data.weather[0].description;
    const condition = mapWeatherCondition(data.weather[0].main);

    // Get rainfall data (OpenWeatherMap provides 1h and 3h data)
    const rainVolume = data.rain?.['1h'] || data.rain?.['3h'] || 0;
    const rainfall = {
      morning: rainVolume > 0 ? Math.min(Math.round(rainVolume * 10), 100) : Math.round(Math.random() * 30),
      afternoon: rainVolume > 0 ? Math.min(Math.round(rainVolume * 15), 100) : Math.round(Math.random() * 40),
      night: rainVolume > 0 ? Math.min(Math.round(rainVolume * 8), 100) : Math.round(Math.random() * 20),
    };

    // Generate alerts based on weather conditions
    const alerts: string[] = [];
    if (data.weather[0].main === 'Thunderstorm') {
      alerts.push('Peringatan badai petir - hindari aktivitas di luar ruangan');
    }
    if (data.main.temp > 35) {
      alerts.push('Suhu sangat tinggi - pastikan tanaman mendapat cukup air');
    }
    if (data.wind.speed > 10) {
      alerts.push('Angin kencang - lindungi tanaman yang rentan');
    }
    if (rainVolume > 10) {
      alerts.push('Hujan lebat diprediksi - pastikan drainase lahan baik');
    }

    return {
      temperature,
      feelsLike,
      humidity,
      windSpeed,
      windDirection,
      condition,
      description,
      rainfall,
      alerts,
      precipitation: rainVolume, // Add precipitation for compatibility
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// FIXED: Function for ML prediction integration
export async function getPredictionLiveFromBackend(
  lat?: number,
  lon?: number
) {
  try {
    // Build URL dengan query parameters jika ada koordinat
    let url = `${API_BASE_URL}/predict-live`;
    
    if (lat && lon) {
      url += `?lat=${lat}&lon=${lon}`;
    }

    console.log('Calling prediction API:', url);

    const response = await fetch(url, {
      method: "GET", // UBAH DARI POST KE GET
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Prediction API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Prediction API response:", data);
    return {
      prediction: data.prediction_ai || data.used_by_frontend || data.prediction_by_date,
      features: data.features,
      prediction_ai: data.prediction_ai,
      prediction_by_date: data.prediction_by_date
    };
  } catch (error) {
    console.error('Error getting prediction from backend:', error);
    throw error;
  }
}

// TAMBAHAN: Function untuk prediksi manual
export async function getPredictionManualFromBackend(features: number[]) {
  try {
    console.log('Sending manual prediction request:', features);

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`Manual prediction API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Manual prediction API response:", data);
    return data.prediction;
  } catch (error) {
    console.error('Error getting manual prediction from backend:', error);
    throw error;
  }
}

// TAMBAHAN: Function untuk ambil data cuaca detail dari backend
export async function getWeatherDataFromBackend(lat: number, lon: number) {
  try {
    const url = `${API_BASE_URL}/weather-data?lat=${lat}&lon=${lon}`;
    console.log('Fetching weather data from backend:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather data API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Weather data API response:", data);
    return data;
  } catch (error) {
    console.error('Error getting weather data from backend:', error);
    throw error;
  }
}

// Helper function to get weather features for ML prediction (5 features as per your model)
export const getWeatherFeaturesForPrediction = async (location: Location): Promise<number[]> => {
  try {
    const coordinates = getCoordinates(location);
    console.log(`Getting weather features for ${location.city} at coordinates:`, coordinates);
    
    const weatherFeatures = await getCurrentWeather(coordinates.lat, coordinates.lon);
    
    // Return 5 features as per your LVQ model: [temperature, rainfall, humidity, windSpeed, windDirection]
    const avgRainfall = (weatherFeatures.rainfall.morning + weatherFeatures.rainfall.afternoon + weatherFeatures.rainfall.night) / 3;
    
    const features = [
      weatherFeatures.temperature,      
      avgRainfall,                     
      weatherFeatures.humidity,        
      weatherFeatures.windSpeed,       
      weatherFeatures.windDirection    
    ];

    console.log(`Weather features for ${location.city}:`, features);
    return features;
  } catch (error) {
    console.error('Error getting weather features for prediction:', error);
    // Return default features if API fails
    return [30, 20, 75, 10, 90];
  }
};

// Get 5-day forecast from OpenWeatherMap
export const getWeatherForecast = async (lat: number, lon: number) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key not found');
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;
  console.log("Forecast URL:", url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.list.slice(0, 5).map((item: any) => ({
      date: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      condition: mapWeatherCondition(item.weather[0].main),
      description: item.weather[0].description,
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed * 3.6),
      rainfall: item.rain?.['3h'] || 0
    }));
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

// Main function to get weather data for a location - FIXED
export async function getWeatherData(location: Location): Promise<WeatherData>;
export async function getWeatherData(lat: number, lon: number): Promise<WeatherData>;
export async function getWeatherData(locationOrLat: Location | number, lon?: number): Promise<WeatherData> {
  try {
    let coordinates: { lat: number; lon: number };
    
    if (typeof locationOrLat === 'number' && typeof lon === 'number') {
      // Called with lat, lon parameters
      coordinates = { lat: locationOrLat, lon };
    } else if (typeof locationOrLat === 'object') {
      // Called with Location object
      coordinates = getCoordinates(locationOrLat as Location);
      console.log(`Getting weather data for ${(locationOrLat as Location).city} at:`, coordinates);
    } else {
      throw new Error('Invalid parameters for getWeatherData');
    }
    
    const weatherFeatures = await getCurrentWeather(coordinates.lat, coordinates.lon);

    const avgPrecipitation = (
      weatherFeatures.rainfall.morning +
      weatherFeatures.rainfall.afternoon +
      weatherFeatures.rainfall.night
    ) / 3;

    return {
      temperature: weatherFeatures.temperature,
      feelsLike: weatherFeatures.feelsLike,
      humidity: weatherFeatures.humidity,
      windSpeed: weatherFeatures.windSpeed,
      condition: weatherFeatures.condition,
      description: weatherFeatures.description,
      precipitation: avgPrecipitation,
      rainfall: weatherFeatures.rainfall,
      alerts: weatherFeatures.alerts
    };
  } catch (error) {
    console.error('Error getting weather data:', error);
    throw error;
  }
}