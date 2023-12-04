  // Substitua 'YOUR_API_KEY' pela chave da API OpenWeatherMap
  const apiKey = '5d9181d3c4d60cc560cf6e329da7374d';
  const city = 'Recife,Pernambuco';

const weatherCard = document.getElementById('weatherCard');

const descricaoTraduzida = {
    'clear sky': 'Céu limpo',
    'few clouds': 'Poucas nuvens',
    'scattered clouds': 'Nuvens dispersas',
    'broken clouds': 'Céu nublado',
    'light rain': 'Chuva leve',
    'moderate rain': 'Chuva moderada',
    'overcast clouds': 'Céu nublado',
    'light intensity shower rain': 'Chuva leve',
    'light intensity drizzle': 'Chuvisco',
    'heavy intensity rain': 'Chuva intensa',
    'shower rain': 'Chuva',
    'rain': 'Chuva',
    'thunderstorm': 'Tempestade',
    'snow': 'Neve',
    'mist': 'Névoa',
};


function formatWithZero(value) {
    return value.toString().padStart(2, '0');
}

// Função para buscar a previsão do tempo
async function getWeather() {
    try {
        // Primeiro fetch para obter os dados da previsão atual
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const currentData = await currentResponse.json();

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Filtrar os dados para pegar a previsão para os próximos dias
        const previsaoProximosDias = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        // Montar a previsão de hoje
        const today = new Date();
        const temperatureToday = currentData.main.temp;
        const descricaoOriginalToday = currentData.weather[0].description;
        const descricaoTraduzidaValorToday = descricaoTraduzida[descricaoOriginalToday] || descricaoOriginalToday;
        const todayHtml = `
            <div class="previsao-card">
                <h3>Previsão de hoje</h3>
                <p>Temperatura: ${temperatureToday}°C</p>
                <p>Descrição: ${descricaoTraduzidaValorToday}</p>
            </div>
        `;

        const previsaoHtml = previsaoProximosDias.map(item => {
            const date = new Date(item.dt * 1000);
            const day = formatWithZero(date.getDate());
            const month = formatWithZero(date.getMonth() + 1);
            const dateText = (day === formatWithZero(today.getDate()) && month === formatWithZero(today.getMonth() + 1))
                ? 'Previsão de hoje'
                : `Previsão para ${day}/${month}`;
        
            const temperature = item.main.temp;
            const descricaoOriginal = item.weather[0].description;
            const descricaoTraduzidaValor = descricaoTraduzida[descricaoOriginal] || descricaoOriginal;
        
            return `
                <div class="previsao-card">
                    <h3>${dateText}</h3>
                    <p>Temperatura: ${temperature}°C</p>
                    <p>Descrição: ${descricaoTraduzidaValor}</p>
                </div>
            `;
        }).join('');

        weatherCard.innerHTML = `
            <h2>Previsão do Tempo em ${city}</h2>
            <div class="previsoes">
                ${todayHtml}
                ${previsaoHtml}
            </div>
        `;
    } catch (error) {
        console.error('Erro ao buscar previsão do tempo:', error);
        weatherCard.innerHTML = '<p>Não foi possível carregar a previsão do tempo.</p>';
    }
}

getWeather();