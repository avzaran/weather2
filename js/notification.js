import { getWeather } from './main.js';
let updateIntervalId = null;

async function showWeatherNotification(city) {
  if (!("Notification" in window)) {
    alert("Ваш браузер не поддерживает уведомления.");
    return;
  }

  let permission = Notification.permission;
  if (permission !== "granted") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    alert("Разрешение на уведомления не предоставлено.");
    return;
  }

  const weather = await getWeather(city);
  if (!weather) {
    console.warn("Не удалось получить данные о погоде.");
    return;
  }

  const notificationText = `
${weather.city}, ${weather.country}
Температура: ${weather.temperature}°C
Погода: ${weather.description}
Влажность: ${weather.humidity}%
Ветер: ${weather.windSpeed} км/ч
  `;

  new Notification("Погода сейчас", {
    body: notificationText,
    icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
  });
}

function startPeriodicWeatherUpdates(city, intervalMs = 1800000) {
  showWeatherNotification(city);
  updateIntervalId = setInterval(() => showWeatherNotification(city), intervalMs);
}

function stopPeriodicWeatherUpdates() {
  if (updateIntervalId) {
    clearInterval(updateIntervalId);
    updateIntervalId = null;
    alert("Уведомления остановлены");
  }
}

document.getElementById('btnStart').addEventListener('click', () => {
  const city = document.getElementById('cityNotification').value;
  if (updateIntervalId) {
    alert("Уведомления уже запущены");
    return;
  }
  startPeriodicWeatherUpdates(city);
});

document.getElementById('btnStop').addEventListener('click', () => {
  stopPeriodicWeatherUpdates();
});
