const apiKey = "6488c154c88dda266cdf8ada6a14f8ac";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try{
    const response = await fetch(apiUrl + city +`&APPID=${apiKey}`);
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =Math.round( data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

   switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "./weather-app-img/images/Clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "./weather-app-img/images/Clear.png";
        break;
      case "Rain":
        weatherIcon.src = "./weather-app-img/images/Rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "./weather-app-img/images/Drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "./weather-app-img/images/Mist.png";
        break;
      default:
        weatherIcon.src = "./weather-app-img/images/default.png";
    }
    document.querySelector(".weather").style.visibility = "visible";
} catch (error){
    alert(error.message);
    }
}

searchBtn.addEventListener("click", ()=>{
    const city = searchBox.value.trim();
    if(city) checkWeather(city);
});

searchBox.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        const city=searchBox.value.trim();
        if(city) checkWeather(city);
    }
});

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        );
        const geoData = await geoRes.json();
        const userCity = geoData[0]?.name || "New York";
        checkWeather(userCity);
      } catch {
        checkWeather("New York");
      }
    }, () => {
      checkWeather("New York");
    });
  } else {
    checkWeather("New York");
  }
});


