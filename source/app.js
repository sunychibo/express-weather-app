// run from cmd with nodemon global
// nodemon ./source/app.js -e js,hbs
// -e file extension watching is needed

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getCoords = require('./utils/getCoords');
const getForecast = require('./utils/getForecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
  response.render('index', {
    title: 'Wheather app',
    name: 'Alexander Chebaev'
  });
});

app.get('/about', (request, response) => {
  response.render('about', {
    title: 'About me',
    name: 'Alexander Chebaev'
  });
});

app.get('/help', (request, response) => {
  response.render('help', {
    title: 'Help',
    message: 'Help articles',
    name: 'Alexander Chebaev'
  });
});

app.get('/weather', (request, response) => {
  if (!request.query.address) {
    return response.send({
      errorMessage: 'You must provide an address'
    })
  }
  getCoords(request.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return response.send(error);
    }
    getForecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return response.send(error);
      }
      response.send({
        forecast: `${forecastData.daily.data[0].summary} It is currently ${forecastData.currently.temperature}C degrees out. There is a ${forecastData.currently.precipProbability * 100}% chance of rain.`,
        location: location,
        address: request.query.address
      });
    });
  });
});

app.get('/help/*', (request, response) => {
  response.render('404', {
    title: '404',
    errorMessage: 'Page with help article not found',
    name: 'Alexander'
  });
});

app.get('*', (request, response) => {
  response.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Alexander'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});