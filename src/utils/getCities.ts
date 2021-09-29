import CityWeather from "@/types/CityWeather";
import { getCityById } from "./getCity";

async function getCities(cities: number[]) {
  return (await Promise.all(cities.map(getCityById))).filter(
    (data) => data
  ) as CityWeather[];
}

export default getCities;
