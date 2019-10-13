const axios = require('axios');

const publicToken = 'access_token=pk.eyJ1Ijoic3VueWNoaWlibyIsImEiOiJjazFtMnpjd2owYjdmM21wZnkydnJnNGI0In0.tyHlyC20ueS-NDSJnrzCTw';
const endpoint = 'mapbox.places';
const geoBaseURL = 'https://api.mapbox.com/geocoding/v5';
const resultLimit = 'limit=1';
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3VueWNoaWlibyIsImEiOiJjazFtMnpjd2owYjdmM21wZnkydnJnNGI0In0.tyHlyC20ueS-NDSJnrzCTw&limit=1

async function getCoords(location, callback) {
  try {
    const response = await axios.get(`${geoBaseURL}/${endpoint}/${encodeURIComponent(location)}.json?${publicToken}&${resultLimit}`);
    if (response.data.features.length === 0) {
      return callback('Unable to find location. Try another search.', undefined);
    }
    callback(undefined, {
      latitude: response.data.features[0].center[1],
      longitude: response.data.features[0].center[0],
      location: response.data.features[0].place_name
    });
  } catch (error) {
    callback('Unable to connect to location services!', undefined);
  }
}

module.exports = getCoords;