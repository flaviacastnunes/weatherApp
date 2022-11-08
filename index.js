function searching(event) {
    event.preventDefault();
    let apiKey = "a1140261bdb0b194c8ae933d2f478860";
    let city = document.querySelector("#city").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = city;
    axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response) {
    let currentTemp = document.querySelector(".currentTemp");
    currentTemp.innerHTML = response.data.main.temp;
  }

  let form = document.querySelector("form");
  form.addEventListener("submit", searching);

  let button = document.querySelector("button");
  button.addEventListener("click", searchPosition);
  
  function searchPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition)
  }
  
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "a1140261bdb0b194c8ae933d2f478860";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
  }

    
  let hour = new Date().getHours();
  let minutes = new Date().getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[new Date().getDay()];
  let h2 = document.querySelector("h2");

  if (minutes < 10) {
    let date = `${day}, ${hour}:0${minutes}`;
    h2.innerHTML = date;
  } else {
    let date = `${day}, ${hour}:${minutes}`;
    h2.innerHTML = date;
  }