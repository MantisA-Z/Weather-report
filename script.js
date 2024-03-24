//selecting elements
let cityName = document.getElementById('usr_inp');
let btn = document.getElementById('btn');
let form = document.getElementById('form');
let card = document.getElementById('card');
let apiKey = '3bb226b971324c3053b7288d6c7c0d2a';

form.addEventListener('submit', async event => {
    event.preventDefault();
    let city = cityName.value;

    if(city){
        try{
            let weatherData = await  fetchData(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.log(error);
            errorDisplay(error)
        }
    }else{
        errorDisplay('Please enter a city name')
    };
});

async function fetchData(city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let rawData = await fetch(apiUrl);
    rawData = await rawData.json();
    return rawData;
};

function displayWeather(data){
    if(data.ok == 'false'){
        errorDisplay('City not found');
    }else{
        let{name : city,
              main: {temp, humidity},
              weather: [{description, id}]} = data;

        temp = ((temp - 273.15) * 9/5 + 32).toFixed(2);
        id = weatherId(id);
        card.innerHTML = `<h1>${city}</h1>
                          <p class="tempDisplay">${temp}°F</p>
                          <p class="humidity">Humidity: ${humidity}%</p>
                          <p class="descDisplay">${description}</p>
                          <p class="weatherEmoji">${id}</p>`;
                          
    };
    console.log(data);
};

function weatherId(id){
    if(id >= 200 && id < 300){
        return '⛈️';
    }else if(id >= 300 && id < 500){
        return '🌦️';
    }else if(id >= 500 && id < 600){
        return '🌧️'
    }else if(id >= 600 && id < 700){
        return '🌨️';
    }else if(id >= 700 && id < 800){
        return '🌫️';
    }else if(id == 800){
        return '☀️';
    }else if(id > 800){
        return '☁️';
    }
}

function errorDisplay(error){
    card.innerHTML = '';
    let errorPara = document.createElement('p');
    errorPara.classList.add('errorDisplay');
    errorPara.textContent = 'City not found';
    card.append(errorPara);
    console.error(error);
};