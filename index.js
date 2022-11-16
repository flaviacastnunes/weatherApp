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
    console.log(response.data); 
    let currentTemp = document.querySelector(".tempNow");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let updatedDate = document.querySelector("h2");
    updatedDate.innerHTML = formatDate(response.data.dt*1000);
    let wind = document.querySelector("#wind");
    wind.innerHTML= response.data.wind.speed;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML= response.data.main.humidity;
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

  let form = document.querySelector("form");
  form.addEventListener("submit", searching);