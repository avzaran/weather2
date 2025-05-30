const toggleBtn = document.getElementById('toggleTheme');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'night') {
    body.classList.remove('day');
    body.classList.add('night');
  } else {
    body.classList.remove('night');
    body.classList.add('day');
  }
  localStorage.setItem('weatherTheme', theme);
}

function detectThemeByTime() {
  const hour = new Date().getHours();
  return (hour >= 7 && hour < 19) ? 'day' : 'night';
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('weatherTheme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const autoTheme = detectThemeByTime();
    applyTheme(autoTheme);
  }
});

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('day')) {
    applyTheme('night');
  } else {
    applyTheme('day');
  }
});
