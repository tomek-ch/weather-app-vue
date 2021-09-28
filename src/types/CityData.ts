interface CityData {
  city: {
    name: string;
  };
  list: {
    dt: number;
    main: { temp: number; humidity: number };
    weather: { icon: string }[];
  }[];
}

export default CityData;
