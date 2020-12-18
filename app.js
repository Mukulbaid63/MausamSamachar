var api = {
  key : "d069687c0e086de4022bf67ee8c0617d",
  base :"https://api.openweathermap.org/data/2.5/" 
}

let latitude,longitude;


var searchbox = document.querySelector('.search-box');
currentlocation()

searchbox.addEventListener('keypress',setQuery);

function currentlocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
  }
}

function setPosition(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  
  getWeather(latitude, longitude);
}

function getWeather(lat,lon) {
  fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city=document.querySelector('.city')
 city.innerHTML= `${weather.name}, ${weather.sys.country}`;
 
 let temp = document.querySelector('.current .temp');
 temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

 let weather_el = document.querySelector('.current .weather');
 weather_el.innerHTML = weather.weather[0].main;

 
 let icon=document.querySelector('.icon-1');
 icon.innerHTML=`<img src="${weather.weather[0].icon}.png"/>`;
 let humidity=document.querySelector('.humidity-value');
 humidity.innerHTML=`${weather.main.humidity}`
 let wind=document.querySelector('.wind-speed');
 wind.innerText=weather.wind.speed;

 let deg=document.querySelector('.wind-degree');
 deg.innerText=weather.wind.deg;
 
}