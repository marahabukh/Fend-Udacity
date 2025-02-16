const geoAPI = 'http://api.geonames.org/searchJSON?q=';
const weatherAPI = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const imageAPI = 'https://pixabay.com/api/?';


const getLocationData = async (destination) => {
    try {
        const response = await fetch(`${geoAPI}${destination}&maxRows=1&username=YOUR_USERNAME`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
};


const getWeatherDetails = async (latitude, longitude) => {
    try {
        const response = await fetch(`${weatherAPI}lat=${latitude}&lon=${longitude}&key=YOUR_API_KEY`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
};


const getDestinationImage = async (query) => {
    try {
        const response = await fetch(`${imageAPI}key=YOUR_API_KEY&q=${query}&image_type=photo`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};


const processTripDetails = async () => {
    const destination = document.getElementById('location').value;
    
    if (!destination) {
        alert("Please enter a destination!");
        return;
    }

    const locationInfo = await getLocationData(destination);
    if (!locationInfo.geonames || locationInfo.geonames.length === 0) {
        alert("Invalid location, try again!");
        return;
    }

    const { lat, lng } = locationInfo.geonames[0];
    const weatherInfo = await getWeatherDetails(lat, lng);
    const imageInfo = await getDestinationImage(destination);

    document.getElementById('results').innerHTML = `
        <p>Weather Forecast: ${weatherInfo.data[0].temp}°C</p>
        <img src="${imageInfo.hits[0].webformatURL}" alt="${destination}">
    `;
};

export { processTripDetails };
