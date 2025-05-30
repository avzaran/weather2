async function getWeather(city) {
    const apiKey = '5f725fd9a82e44cd85b132129253005';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=ru`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        return {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        feelslike: data.current.feelslike_c,
        description: data.current.condition.text,
        condition_icon: data.current.condition.icon,
        humidity: data.current.humidity,
        uv: data.current.uv,
        cloud: data.current.cloud,
        windSpeed: data.current.wind_kph,
        timezone: data.location.tz_id,
        localtime: data.location.localtime,
        };
    } 
    catch (error) {
        console.error('Ошибка:', error.message);
        return null;
    }
}

async function showWeather() {
    const city = document.getElementById('city').value;
    const weather = await getWeather(city);

    const result = document.querySelector('.result');
    if (weather) {
        result.innerHTML = `
         <h2>${weather.city}, ${weather.country}</h2>
        <p>Температура: ${weather.temperature} °C</p>
        <p>Ощущается как: ${weather.feelslike} °C</p>
        <img src="${weather.condition_icon}" alt="Погода">
        <p>УФ-индекс: ${weather.uv}</p>
        <p>Облачность: ${weather.cloud}%</p>
        <p>Погода: ${weather.description}</p>
        <p>Влажность: ${weather.humidity}%</p>
        <p>Ветер: ${weather.windSpeed} м/с</p>
        <p>Часовой пояс: ${weather.timezone}</p>
        <p>Местное время: ${weather.localtime}</p>
        `;
    }
    else {
        result.innerHTML = 'Город не найден или не удалось получить данные'; 
    }
}

document.getElementById('btn').addEventListener('click', showWeather);

