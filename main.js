// Foursquare API Info
const clientId = '';
const clientSecret = '';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=&q=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190510`;
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      let venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
    }
  } catch(error) {
    console.log(error);
  }
  
}

const getPhotos = async(venueId) => {

  const urlToFetch = `https://api.foursquare.com/v2/venues/${venueId}/photos?&client_id=${clientId}&client_secret=${clientSecret}&v=20190510`;

  try {
    const response = await fetch(urlToFetch);
    
    if (response.ok) {
      const jsonResponse = await response.json();
      let photoUrl = `https://fastly.4sqi.net/img/general/200x200${jsonResponse.response.photos.items[0].suffix}`;

      return photoUrl;
    }
  } catch(error) {
    console.log(error);
  }
}

const getForecast = async () => {
  
  const city = $input.val();
  const urlToFetch = `${forecastUrl}${city}&days=4&hour=11`;
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const days = jsonResponse.forecast.forecastday;
      return days;
    }
  } catch(error) {
    console.log(error)
  }
  
}

// Render functions
const renderVenues = (venues) => {
  let shuffledVenues = shuffleVenues(venues);
  $venueDivs.forEach(async ($venue, index) => {
    // Add your code here:
    const venue = shuffledVenues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let photo = await getPhotos(venue.id);

    let venueContent = `${createVenueHTML(venue.name, venue.location, venueImgSrc, photo)}`;
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const currentDay = days[index];
    
    let weatherContent = `${createWeatherHTML(currentDay)}`;
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)