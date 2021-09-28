interface Forecast {
  humidity: number;
  temperature: number;
  dt: number;
}

interface CityWeather {
  name: string;
  icon: string;
  humidity: number;
  temperature: number;
  forecast: Forecast[];
}

export default CityWeather;
