interface Forecast {
  humidity: number;
  temperature: number;
  timestamp: number;
}

interface CityWeather {
  name: string;
  timezone: number;
  icon: string;
  humidity: number;
  temperature: number;
  forecast: Forecast[];
}

export default CityWeather;
