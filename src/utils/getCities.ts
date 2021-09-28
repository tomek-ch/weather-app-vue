import CityWeather from "@/types/CityWeather";
import getWeather from "./getCity";

async function getCities(cities: string[]) {
  const result = (await Promise.all(cities.map(getWeather))).filter(
    (data) => data
  ) as CityWeather[];
  return result;
}

export default getCities;
