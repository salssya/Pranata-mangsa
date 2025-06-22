export interface Location {
  province: string;
  city: string;
}

export interface MangsaIndicator {
  name: string;
  description: string;
}

export interface Crop {
  name: string;
  description: string;
}

export interface MangsaInfo {
  number: string;
  name: string;
  period: string;
  characteristics: string;
  indicators: MangsaIndicator[];
  suitableCrops: Crop[];
  farmingStatus: string;
  mainActivity: string;
  farmingTips: string[];
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  description: string;
  rainfall: {
    morning: number;
    afternoon: number;
    night: number;
  };
  alerts: string[];
}