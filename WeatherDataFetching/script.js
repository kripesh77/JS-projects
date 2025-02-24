document.addEventListener('DOMContentLoaded', function(){
    const API_key = 'd2fdd09c3da202c8c99327d1fa0458fc'


    let input = document.getElementById('city-input')
    let getWeatherBtn = document.getElementById('get-weather-btn')
    let weatherInfoDisplay = document.getElementById('weather-info')
    let cityNameDisplay = document.getElementById('city-name')
    let temperatureDisplay = document.getElementById('temperature')
    let descriptionDisplay = document.getElementById('description')
    let errorMessage = document.getElementById('error-message')

    getWeatherBtn.addEventListener('click', async function(){
        let city = input.value.trim()
        if (city == "") {
            alert('Please enter the city...')
        }
        else{
            
            try {
                let weatherData = await fetchWeatherInfo(city)
                displayWeatherData(weatherData);
            } catch (error) {
                showError()
            }
            input.value = ''
        }
    })

    async function fetchWeatherInfo(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
        let response = await fetch(url);
        //I got response property by logging the response
        //response.ok == true is also extracted from logged response

        if(!response.ok){
            throw new error()
        }
        else{
            let weatherData = await response.json()
            return weatherData
        }
    }

    input.addEventListener('keypress', function(e){
        if(e.key == 'Enter'){
            getWeatherBtn.click()
        }
    })


    function displayWeatherData(weatherData){
        weatherInfoDisplay.classList.remove('hidden')
        errorMessage.classList.add('hidden')
        cityNameDisplay.innerText = weatherData.name
        let weatherTemperature = (weatherData.main.temp - 273.15).toFixed(2)
        temperatureDisplay.innerText = `Temperature: ${weatherTemperature}°C`
        descriptionDisplay.innerText = `Weather: ${weatherData.weather[0].description}`

    }

    function showError(){
        weatherInfoDisplay.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }

})