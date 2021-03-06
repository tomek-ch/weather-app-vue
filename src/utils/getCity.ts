import CityData from "@/types/CityData";

async function getWeather(location: string) {
  const url = "https://api.openweathermap.org/data/2.5/forecast";
  const key = "77507ca00606a30af83452d6251687da";
  const units = "metric";
  const endpoint = `${url}?${location}&appid=${key}&units=${units}`;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data: CityData = await response.json();

      const forecast = data.list
        .slice(0, 6)
        .map(({ dt, main: { temp, humidity } }) => ({
          temperature: temp,
          humidity,
          timestamp: dt,
        }));

      const { id, name, timezone } = data.city;
      const { temp, humidity } = data.list[0].main;
      return {
        id,
        name,
        timezone,
        temperature: temp,
        humidity,
        icon: `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
        forecast,
      };
    }
  } catch (e) {
    console.log(e);
  }
}

export const getCityByName = (name: string) => getWeather(`q=${name}`);
export const getCityById = (id: number) => getWeather(`id=${id}`);
