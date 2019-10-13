

const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const forecastMessage = document.querySelector('.forecast-message');
const locationMessage = document.querySelector('.location-message');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = searchField.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    
      console.log(data.errorMessage);

      locationMessage.textContent = data.location;
      forecastMessage.textContent = data.forecast;
    })
  })
})