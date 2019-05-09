const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  return `<h2> High: ${currentDay.day.maxtemp_f}</h2>
    <h2> Low: ${currentDay.day.mintemp_f}</h2>
    <h2> Average Humidity: ${currentDay.day.avghumidity}</h2>
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>`;
}

const shuffleVenues = venues => {
  for (let i = venues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [venues[i], venues[j]] = [venues[j], venues[i]];
  }
  return venues;
}