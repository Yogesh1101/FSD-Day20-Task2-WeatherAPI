// ids
// Top: Date: month, year, day, daynum
// Middle : degreeNumber, searchedPlaced, weatherState, imgWeatherState
// Bottom : wind, humidity, visibility, feltTemp, highTemp, lowTemp

function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
    mon = now.getMonth(),
    yr = now.getFullYear(),
    dnum = now.getDate();
    hour = now.getHours();
    minute = now.getMinutes();
    pe = "AM";

    if(hour == 0){
        hour = 12;
    }
    if(hour > 12){
        hour = hour - 12;
        pe = "PM";
    }

    Number.prototype.pad = function(digits){
        for(var n = this.toString();
        n.length < digits;
        n = 0 + n);
        return n;
    }
    
    var months = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ["day", "daynum", "hour", "month", "min", "year"];
    var values = [weeks[dname], dnum.pad(2), hour.pad(2), months[mon], minute.pad(2), yr];
    for(let i = 0; i < ids.length; i++){
        document.getElementById(ids[i]).innerHTML = values[i];
    }
}

function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1);
}

//linking all required tags
let btnSearch = document.querySelector(".btnSearch");
let inputSearch = document.querySelector(".inputSearch");


btnSearch.addEventListener("click", (mouse) => {
    mouse.preventDefault();
    if(inputSearch.value == ""){
        alert("Enter the City/Country Name to Search");
    }else{
        updateData(inputSearch.value);
        inputSearch.value = "";
    }
});

document.addEventListener("keyup", (keyboard) => {
    if(keyboard.key == "Enter"){
        if(inputSearch.value == ""){
            alert("Enter the City/Country Name to Search");
        }else{
            updateData(inputSearch.value);
            inputSearch.value = "";
        }
    }
});

//Fetching the data using async function

async function updateData(name){
    const apiKey = "07bc5a764ab26cefa20583232606e2dc";
    let location = name;

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.cod == "404"){
            alert("Kindly Enter Valid City");
        }else{
            let displayTemp = data.main.temp;
            let cityName = data.name;
            let weather = data.weather[0].main;
            let wind = data.wind.speed;
            let humidity = data.main.humidity;
            let visibility = data.visibility / 1000;
            let feltTemp = data.main.feels_like;
            let highTemp = data.main.temp_max;
            let lowTemp = data.main.temp_min;
            let image = weather;

            let displayTempDOM = document.querySelector(".degree");
            let cityNameDOM = document.querySelector(".place");
            let weatherDOM = document.querySelector(".weather");
            let windDOM = document.querySelector(".wind");
            let humidityDOM = document.querySelector(".humidity");
            let visibilityDOM = document.querySelector(".visibility");
            let feltTempDOM = document.querySelector(".feltTemp");
            let highTempDOM = document.querySelector(".highTemp");
            let lowTempDOM = document.querySelector(".lowTemp");
            let imageDOM = document.querySelector(".imgWeather");

            displayTempDOM.innerHTML = `${displayTemp} &#8451;`;
            cityNameDOM.innerHTML = cityName;
            weatherDOM.innerHTML = weather;
            windDOM.innerHTML = `${wind} km/h`;
            humidityDOM.innerHTML = `${humidity} %`;
            visibilityDOM.innerHTML = `${visibility} km`;
            feltTempDOM.innerHTML = `${feltTemp} &#8451;`;
            highTempDOM.innerHTML = `${highTemp} &#8451;`;
            lowTempDOM.innerHTML = `${lowTemp} &#8451;`;

            switch(weather){
                case "Clouds":
                    imageDOM.src = "./images/clouds.png";
                    break;
                case "Clear":
                    imageDOM.src = "./images/clear.png";
                    break;
                case "Drizzle":
                    imageDOM.src = "./images/drizzle.png";
                    break;
                case "Mist":
                    imageDOM.src = "./images/mist.png";
                    break;
                case "Rain":
                    imageDOM.src = "./images/rain.png";
                    break;
                case "Snow":
                    imageDOM.src = "./images/snow.png";
                    break;
                default:
                    break;
            }

        }
    })

}