function searching(event) {
    event.preventDefault();
    let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
    let city = document.querySelector("#city").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = city;
    axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response) {
    celsiusTemp=response.data.main.temp;
    let currentTemp = document.querySelector(".tempNow");
    currentTemp.innerHTML = Math.round(celsiusTemp);
    let updatedDate = document.querySelector("h2");
    updatedDate.innerHTML = formatDate(response.data.dt*1000);
    let wind = document.querySelector("#wind");
    wind.innerHTML= response.data.wind.speed;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML= response.data.main.humidity;
    let icon = document.querySelector(".icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    let description = document.querySelector(".description");
    description.innerHTML= response.data.weather[0].description;  
    getForecast(response.data.coord);
        }

    function getForecast(coordinates){
      let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
      let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayForecast);
         }

         function formatDay(timestamp){
          let date = new Date(timestamp*1000);
          let day = date.getDay();
          let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          return days[day];
         }

 function displayForecast(response){
  console.log(response.data);
        let forecast = response.data.daily;
        let forecastElement = document.querySelector("#forecast");
        let forecastHTML = `<div class="row">`;
        forecast.forEach(function(forecastDay, index) {
          if (index <5) {
          forecastHTML= forecastHTML+ `
            <div class="col-2">
              ${formatDay(forecastDay.dt)} 
              <br>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="forecast-icon" width=60px/>
              <br>
              ${Math.round(forecastDay.temp.max)}º | <span>${Math.round(forecastDay.temp.min)}º</span>
                </div>`}});
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    if (hour <10) {
      hour= `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes <10) {
      minutes= `0${minutes}`;
    }
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
    let day = days[date.getDay()];
    return `${day}, ${hour}:${minutes}`;    
   } 


   function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city");
    searching(city.value);
   }

let convertFahrenheit = document.querySelector("#fahrenheit-link");
  convertFahrenheit.addEventListener("click", showFahrenheit);

function showFahrenheit(event) {
    event.preventDefault();
    convertCelsius.classList.remove("active");
    convertFahrenheit.classList.add("active");
    let currentTemp = document.querySelector(".tempNow");
    let fahrenheitTemp = celsiusTemp*9/5+32;
    currentTemp.innerHTML= Math.round(fahrenheitTemp); 
    }

let convertCelsius = document.querySelector("#celsius-link");
    convertCelsius.addEventListener("click", showCelsius);

    function showCelsius(event) {
      event.preventDefault();
      let currentTemp = document.querySelector(".tempNow");
      currentTemp.innerHTML= Math.round(celsiusTemp); 
      convertCelsius.classList.add("active");
      convertFahrenheit.classList.remove("active");
      }

    

let celsiusTemp=null;

  let form = document.querySelector("form");
  form.addEventListener("submit", searching);

displayForecast();