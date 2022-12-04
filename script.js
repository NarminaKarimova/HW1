const container = document.querySelector(".container"),
    userInput = container.querySelector(".user-input"),
    message = userInput.querySelector(".message"),
    inputCity = userInput.querySelector(".cityName"),
    inputLat = userInput.querySelector(".lat"),
    inputLong = userInput.querySelector(".long"),
    coordinates = userInput.querySelector(".coordinates"),
    currentLocation = userInput.querySelector(".location"),
    weatherIcon = document.querySelector(".weather-icon"),
    windDirection = document.querySelector(".number-7"),
    refresh = container.querySelector("h1 i");
citybtn = userInput.querySelector(".citybtn");

//based on entered city
citybtn.addEventListener("click", () => {
    if (inputCity.value != "") {
        apiRequest(inputCity.value);
    }

});
//based on coordinates
coordinates.addEventListener("click", () => {
    if (inputLat.value != "" && inputLong.value != "") {
        coordRequest(inputLat.value, inputLong.value);
    }

});

//based on current location
currentLocation.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Success, Err)
    }
    else {
        alert("Your browser does not support geo-api");
    }
});

function Err(error) {
    // console.log(error);
    info.innerText = error.message;
    info.classList.add("err");
}

function Success(position) {
    const { latitude, longitude } = position.coords;
    let API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=226d39f7203400614f44b1364beee670`;

    message.innerText = "Searching for the location..."
    message.classList.add("load");
    fetch(API).then(response => response.json()).then(result => weatherInfo(result)).catch(() => {
        message.innerText = "Something went wrong";
        message.classList.replace("load", "err");
    });

    console.log(position);
}
//go back
refresh.addEventListener("click", () => {
    container.classList.remove("results");
    inputCity.value = "";
    inputLat.value = "";
    inputLong.value = "";
});


function apiRequest(city) {
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=226d39f7203400614f44b1364beee670`;

    message.innerText = "Searching for the location..."
    message.classList.add("load");
    fetch(API).then(response => response.json()).then(result => weatherInfo(result)).catch(() => {
        message.innerText = "Something went wrong";
        message.classList.replace("load", "err");
    });
}

function coordRequest(lat, long) {
    let API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=226d39f7203400614f44b1364beee670`;

    message.innerText = "Searching for the location..."
    message.classList.add("load");
    fetch(API).then(response => response.json()).then(result => weatherInfo(result))

}

function weatherInfo(info) {
    message.classList.replace("load", "err");
    if (info.cod == "404") {
        message.innerText = `${inputCity.value}: The city is not found`; //message when the name of the city is invalid
    }
    else {
        const city = info.name;
        const country = info.sys.country;
        const id = info.weather[0].id;
        //changing icons based on id in json object
        if (id == 800) {
            weatherIcon.src = "images/sunny.png";
        } else if (id >= 200 && id <= 232) {
            weatherIcon.src = "images/storm.png";
        } else if (id >= 600 && id <= 622) {
            weatherIcon.src = "images/snow.png";
        } else if (id >= 701 && id <= 781) {
            weatherIcon.src = "images/haze.png";
        } else if (id >= 801 && id <= 804) {
            weatherIcon.src = "images/cloudy.png";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            weatherIcon.src = "images/rain.png";
        }

        const condition = info.weather[0].main;
        const detailed_condition = info.weather[0].description;
        const { feels_like, humidity, pressure, temp, temp_max, temp_min } = info.main;
        const windSpeed = info.wind.speed;
        const windDegree = info.wind.deg;
        //changing wind-direction based on deg in json oblect
        if (windDegree > 11.25 && windDegree < 33.75) {
            windDirection.innerText = "NNE";
        } else if (windDegree > 33.75 && windDegree < 56.25) {
            windDirection.innerText = "ENE";
        } else if (windDegree > 56.25 && windDegree < 78.75) {
            windDirection.innerText = "E";
        } else if (windDegree > 78.75 && windDegree < 101.25) {
            windDirection.innerText = "ESE";
        } else if (windDegree > 101.25 && windDegree < 123.75) {
            windDirection.innerText = "ESE";
        } else if (windDegree > 123.75 && windDegree < 146.25) {
            windDirection.innerText = "SE";
        } else if (windDegree > 146.25 && windDegree < 168.75) {
            windDirection.innerText = "SSE";
        } else if (windDegree > 168.75 && windDegree < 191.25) {
            windDirection.innerText = "S";
        } else if (windDegree > 191.25 && windDegree < 213.75) {
            windDirection.innerText = "SSW";
        } else if (windDegree > 213.75 && windDegree < 236.25) {
            windDirection.innerText = "SW";
        } else if (windDegree > 236.25 && windDegree < 258.75) {
            windDirection.innerText = "WSW";
        } else if (windDegree > 258.75 && windDegree < 281.25) {
            windDirection.innerText = "W";
        } else if (windDegree > 281.25 && windDegree < 303.75) {
            windDirection.innerText = "WNW";
        } else if (windDegree > 303.75 && windDegree < 326.25) {
            windDirection.innerText = "NW";
        } else if (windDegree > 326.25 && windDegree < 348.75) {
            windDirection.innerText = "NNW";
        } else {
            windDirection.innerText = "N";
        }

        const date = new Date();


        //dynamic changes based on json object
        container.querySelector(".city").innerText = `${city}`;
        container.querySelector(".cntry").innerText = `${country}`;
        container.querySelector(".weather-icon").innerText = `${id}`;
        container.querySelector(".condition").innerText = `${condition}`;
        container.querySelector(".detailed_condition").innerText = `${detailed_condition}`;
        container.querySelector(".main_temp").innerText = `${Math.floor(temp)}°C`;
        container.querySelector(".min_temp").innerText = `${Math.floor(temp_min)}°C`;
        container.querySelector(".real_temp").innerText = `${Math.floor(feels_like)}°C`;
        container.querySelector(".max_temp").innerText = `${Math.floor(temp_max)}°C`;
        container.querySelector(".data .number-4").innerText = `${humidity}%`;
        container.querySelector(".pressure .number-5").innerText = `${pressure}hPa`;
        container.querySelector(".wind .number-6").innerText = `${Math.floor(windSpeed)}m/s`;
        container.querySelector(".number-8").innerText = `${date}`;




        //remove the message when the city is found
        message.classList.remove("load", "err");
        container.classList.add("results");
        console.log(info);
    }
}
