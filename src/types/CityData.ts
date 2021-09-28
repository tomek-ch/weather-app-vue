interface CityData {
  city: {
    name: string;
    timezone: number;
  };
  list: {
    dt: number;
    main: { temp: number; humidity: number };
    weather: { icon: string }[];
  }[];
}

export default CityData;
