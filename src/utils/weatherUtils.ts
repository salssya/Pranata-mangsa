import { WeatherData, Location } from '../types';

// Get coordinates for Indonesian cities
const getCoordinates = (location: Location): { lat: number; lon: number } => {
  const coordinates: Record<string, { lat: number; lon: number }> = {
    'Gresik': { lat: -7.1564, lon: 112.6536 },
    'Yogyakarta': { lat: -7.7956, lon: 110.3695 },
  };
  
  return coordinates[location.city] || coordinates['Gresik'];
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

// Get weather features from OpenWeatherMap API
export const getWeatherFeatures = async (lat: number, lon: number) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

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
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Function for ML prediction integration
export async function getPredictionFromBackend(features: number[]) {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`Prediction API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("hasil dari get data ", data);
    return data.prediction;
  } catch (error) {
    console.error('Error getting prediction from backend:', error);
    throw error;
  }
}

// Helper function to get weather features for ML prediction (5 features as per your model)
export const getWeatherFeaturesForPrediction = async (location: Location): Promise<number[]> => {
  try {
    const coordinates = getCoordinates(location);
    const weatherFeatures = await getWeatherFeatures(coordinates.lat, coordinates.lon);
    
    // Return 5 features as per your LVQ model: [temperature, rainfall, humidity, windSpeed, windDirection]
    const avgRainfall = (weatherFeatures.rainfall.morning + weatherFeatures.rainfall.afternoon + weatherFeatures.rainfall.night) / 3;
    
    return [
      weatherFeatures.temperature,      
      avgRainfall,                     
      weatherFeatures.humidity,        
      weatherFeatures.windSpeed,       
      weatherFeatures.windDirection    
    ];
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
  console.log("hasil dari url ", + url);

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

// Main function to get weather data for a location
export async function getWeatherData(location: Location): Promise<WeatherData> {
  try {
    const coordinates = getCoordinates(location);
    const weatherFeatures = await getWeatherFeatures(coordinates.lat, coordinates.lon);
    
    return {
      temperature: weatherFeatures.temperature,
      feelsLike: weatherFeatures.feelsLike,
      humidity: weatherFeatures.humidity,
      windSpeed: weatherFeatures.windSpeed,
      condition: weatherFeatures.condition,
      description: weatherFeatures.description,
      rainfall: weatherFeatures.rainfall,
      alerts: weatherFeatures.alerts
    };
  } catch (error) {
    console.error('Error getting weather data:', error);
    
    // Fallback to mock data if API fails
    console.warn('Falling back to mock weather data');
    return getMockWeatherData(location);
  }
}

// Fallback mock data function
function getMockWeatherData(location: Location): WeatherData {
  const mockWeatherData: Record<string, WeatherData> = {
    'Gresik': {
      temperature: 32,
      feelsLike: 34,
      humidity: 75,
      windSpeed: 12,
      condition: 'sunny',
      description: 'Cerah berawan',
      rainfall: {
        morning: 10,
        afternoon: 20,
        night: 5
      },
      alerts: []
    },
    'Yogyakarta': {
      temperature: 29,
      feelsLike: 31,
      humidity: 80,
      windSpeed: 8,
      condition: 'rainy',
      description: 'Hujan ringan',
      rainfall: {
        morning: 60,
        afternoon: 80,
        night: 70
      },
      alerts: [
        'Potensi hujan lebat di sore hari',
        'Waspada banjir di beberapa area rendah'
      ]
    },
    'default': {
      temperature: 30,
      feelsLike: 32,
      humidity: 75,
      windSpeed: 10,
      condition: 'sunny',
      description: 'Cerah',
      rainfall: {
        morning: 20,
        afternoon: 30,
        night: 15
      },
      alerts: []
    }
  };
  
  return mockWeatherData[location.city] || mockWeatherData.default;
}