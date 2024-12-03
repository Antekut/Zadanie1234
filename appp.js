const apiKey = 'your_api_key_here'; 
const cityInput = document.getElementById('cityName');
const addCityButton = document.getElementById('addCity');
const cityTitle = document.getElementById('cityTitle');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const weatherIcon = document.getElementById('weatherIcon');
const cityList = document.getElementById('cities');
const weatherChart = document.getElementById('weatherChart');


async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`);
  const data = await response.json();
  
  if (data.cod === 200) {
    const { name, main, weather } = data;
    
    
    cityTitle.textContent = name;
    temperature.textContent = `Temperatura: ${main.temp}°C`;
    humidity.textContent = `Wilgotność: ${main.humidity}%`;
    pressure.textContent = `Ciśnienie: ${main.pressure} hPa`;
    
    
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    
  
    let savedCities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!savedCities.includes(name)) {
      savedCities.push(name);
      localStorage.setItem('cities', JSON.stringify(savedCities));
      updateCityList();
    }
  } else {
    alert('Miasto nie zostało znalezione!');
  }
}


function updateCityList() {
  const cities = JSON.parse(localStorage.getItem('cities')) || [];
  cityList.innerHTML = '';
  cities.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => getWeather(city); 
    cityList.appendChild(li);
  });
}


setInterval(() => {
  const city = cityTitle.textContent;
  if (city) {
    getWeather(city);
  }
}, 120000); 


addCityButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
});


window.onload = updateCityList;

async function getHourlyWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`);
    const data = await response.json();
    
    if (data.cod === '200') {
      const times = data.list.map(item => item.dt_txt);
      const temperatures = data.list.map(item => item.main.temp);
      
      const ctx = document.createElement('canvas');
      weatherChart.innerHTML = '';
      weatherChart.appendChild(ctx);
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: times,
          datasets: [{
            label: 'Temperatura (°C)',
            data: temperatures,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'category',
              labels: times,
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  
