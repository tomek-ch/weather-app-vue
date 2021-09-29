import CityData from "@/types/CityData";

async function getWeather(location: string) {
  const url = "https://api.openweathermap.org/data/2.5/forecast";
  const key = "77507ca00606a30af83452d6251687da";
  const units = "metric";
  const endpoint = `${url}?q=${location}&appid=${key}&units=${units}`;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data: CityData = await response.json();

      const forecast = data.list.slice(0, 6).map((item) => ({
        temperature: item.main.temp,
        humidity: item.main.humidity,
        timestamp: item.dt,
      }));

      return {
        name: data.city.name,
        timezone: data.city.timezone,
        temperature: data.list[0].main.temp,
        humidity: data.list[0].main.humidity,
        icon: `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
        forecast,
      };
    }
  } catch (e) {
    console.log(e);
  }
}

export default getWeather;
