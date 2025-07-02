document.getElementById('search').onclick = async function () {
    const city = document.getElementById('city').value;
    if (!city) return alert('Digite uma cidade!');

    // Usando a API Nominatim para obter latitude e longitude
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
    const geoData = await geoRes.json();
    if (!geoData[0]) {
        document.getElementById('weather').innerText = 'Cidade não encontrada!';
        return;
    }
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // Usando a Open-Meteo API para clima atual e previsão de 5 dias
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto`);
    const weatherData = await weatherRes.json();
    if (weatherData.current_weather && weatherData.daily) {
        const w = weatherData.current_weather;
        const daily = weatherData.daily;
        // Mapeamento simples de weathercode para ícone e descrição
        const weatherIcons = {
            0: {icon: '☀️', desc: 'Clear'},
            1: {icon: '🌤️', desc: 'Mainly clear'},
            2: {icon: '⛅', desc: 'Partly cloudy'},
            3: {icon: '☁️', desc: 'Cloudy'},
            45: {icon: '🌫️', desc: 'Fog'},
            48: {icon: '🌫️', desc: 'Depositing rime fog'},
            51: {icon: '🌦️', desc: 'Drizzle: Light'},
            53: {icon: '🌦️', desc: 'Drizzle: Moderate'},
            55: {icon: '🌦️', desc: 'Drizzle: Dense'},
            61: {icon: '🌧️', desc: 'Rain: Slight'},
            63: {icon: '🌧️', desc: 'Rain: Moderate'},
            65: {icon: '🌧️', desc: 'Rain: Heavy'},
            80: {icon: '🌦️', desc: 'Rain showers: Slight'},
            81: {icon: '🌦️', desc: 'Rain showers: Moderate'},
            82: {icon: '🌦️', desc: 'Rain showers: Violent'},
        };
        const weather = weatherIcons[w.weathercode] || {icon: '❓', desc: 'Unknown'};
        let forecastHTML = '';
        for (let i = 1; i <= 5; i++) {
            const code = daily.weathercode[i];
            const icon = (weatherIcons[code] || {icon: '❓'}).icon;
            const date = new Date(daily.time[i]);
            forecastHTML += `
                <div class="forecast-day">
                    <div>${date.toLocaleDateString('pt-BR', { weekday: 'short' })}</div>
                    <div style="font-size:1.5rem;">${icon}</div>
                    <div style="font-size:0.95rem;">${daily.temperature_2m_max[i]}°C / ${daily.temperature_2m_min[i]}°C</div>
                    <div style="font-size:0.85rem;color:#666;">${daily.windspeed_10m_max[i]} km/h</div>
                </div>
            `;
        }
        document.getElementById('weather').innerHTML = `
            <div style="display:flex;align-items:center;gap:18px;margin-bottom:8px;">
                <span style="font-size:3.5rem;">${weather.icon}</span>
                <div>
                    <span style="font-size:2.8rem;font-weight:600;">${w.temperature}°C</span><br>
                    <span style="font-size:1rem;color:#666;">${w.windspeed} km/h</span>
                </div>
            </div>
            <div style="text-align:left;font-size:1.1rem;">
                <div><strong>Temperature:</strong> <span style="float:right;">${w.temperature}°C</span></div>
                <div><strong>Wind Speed:</strong> <span style="float:right;">${w.windspeed} km/h</span></div>
                <div><strong>Weather:</strong> <span style="float:right;">${weather.desc}</span></div>
            </div>
            <div style="margin-top:22px;">
                <div style="font-weight:600;margin-bottom:8px;">Próximos 5 dias:</div>
                <div style="display:flex;gap:10px;justify-content:space-between;">${forecastHTML}</div>
            </div>
        `;
    } else {
        document.getElementById('weather').innerText = 'Não foi possível obter o clima.';
    }
};