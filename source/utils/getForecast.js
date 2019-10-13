const axios = require('axios');

const personalToken = 'f3006515615caef69059b15808539b23';
const baseURL = 'https://api.darksky.net/forecast';
const langKey = 'lang=ru';
const measureSystem = 'units=si';
// https://api.darksky.net/forecast/f3006515615caef69059b15808539b23/55.7522200,37.6155600

async function getForecast(latitude, longitude, callback) {
  try {
    const response = await axios.get(`${baseURL}/${personalToken}/${latitude},${longitude}?${langKey}&${measureSystem}`);
    if (response.data.error) {
      return callback('Unable to find location.', undefined);
    }
    callback(undefined, response.data);
  } catch (error) {
    callback('Unable to connect to weather service!', undefined);
  }
}

module.exports = getForecast;