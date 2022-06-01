'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  evt.preventDefault(); 
  
  const url = '/fortune'

  fetch(url)
    .then((response) => response.text())
    .then((status) => {
      document.querySelector('#fortune-text').innerHTML = status;
    });

}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();


 
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  
  const queryString = new URLSearchParams({'zipcode': zipcode}).toString();
  const url = `/weather.json?${queryString}`;

  fetch(url)
    .then((response) => response.json())
    .then((status) => {
      document.querySelector('#weather-info').innerHTML = status['forecast'];
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method:'POST',
    body: JSON.stringify(formInputs), 
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      document.querySelector('#order-status').innerHTML = responseJson.msg
      console.log(typeof(responseJson['code']))

      if (responseJson['code'] === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error')
      } else {
        document.querySelector('#order-status').classList.remove('order-error')
      }
    })
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


//FURTHER STUDY: GET DOG IMAGE FROM 3RD PARTY API
function dogPic(evt) {
  evt.preventDefault();

  const url = 'https://dog.ceo/api/breeds/image/random';

  fetch(url)
    .then((response) => response.json())
    .then((status) => {
      let newPic = status['message']
      document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<img src=${newPic}>`);
    });

}

document.querySelector('#get-dog-image').addEventListener('click', dogPic);