import CityWeather from "@/types/CityWeather";

async function getWeather(location: string) {
  const url = "https://api.openweathermap.org/data/2.5/forecast";
  const key = "77507ca00606a30af83452d6251687da";
  const units = "metric";
  const endpoint = `${url}?q=${location}&appid=${key}&units=${units}`;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return {
        name: data.city.name,
        temperature: data.list[0].main.temp,
        humidity: data.list[0].main.humidity,
      } as CityWeather;
    }
  } catch (e) {
    console.log(e);
  }
}

export default getWeather;
