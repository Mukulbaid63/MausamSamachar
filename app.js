const loaderContainer=document.querySelector('.loader-container');
const mainContent=document.querySelector('.main-content');

window.addEventListener('load',()=>{
  loaderContainer.classList.add('hide');
  mainContent.classList.remove('hide1');
});



var api = {
  key : "87cde31000e5170290cebdd94820d23d",
  base :"https://api.openweathermap.org/data/2.5/" 
}

let latitude,longitude;

var searchbox = document.querySelector('.search-box');
currentlocation()

searchbox.addEventListener('keypress',setQuery);
function setQuery(evt) {
    let city = document.querySelector('.location .city');
    console.log(evt)
    if (evt.keyCode == 13) {
       getResults(searchbox.value)
       console.log(searchbox.value);
    }
}

function getResults(query) {
    if(query==""){
        currentlocation()
        return ;
    }
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{ 
       return weather.json();
   }) .then(displayResults)
}

function currentlocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
  }
}

function setPosition(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude+""+longitude)
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
 temp.innerHTML = `${Math.round(weather.main.temp)}`;

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
