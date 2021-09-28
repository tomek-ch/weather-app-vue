function getTime(timestamp: number, timezone: number) {
  const date = new Date(
    timestamp * 1000 +
      new Date().getTimezoneOffset() * 60 * 1000 +
      timezone * 1000
  );
  const hour = date.getHours();
  return `${hour < 10 ? 0 : ""}${hour}:00`;
}

export default getTime;
