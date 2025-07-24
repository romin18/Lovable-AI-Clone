export const testWeatherAppHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App - Test</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .weather-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            max-width: 450px;
            width: 100%;
            text-align: center;
        }
        
        .app-title {
            font-size: 2.5em;
            font-weight: 700;
            color: #2d3436;
            margin-bottom: 30px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .search-container {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        .search-input {
            flex: 1;
            padding: 15px 20px;
            border: 2px solid #ddd;
            border-radius: 15px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .search-input:focus {
            border-color: #74b9ff;
            box-shadow: 0 0 10px rgba(116, 185, 255, 0.3);
        }
        
        .search-btn {
            padding: 15px 25px;
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(116, 185, 255, 0.4);
        }
        
        .weather-info {
            display: none;
            animation: fadeIn 0.5s ease;
        }
        
        .weather-info.show {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .city-name {
            font-size: 1.8em;
            font-weight: 600;
            color: #2d3436;
            margin-bottom: 10px;
        }
        
        .weather-icon {
            font-size: 4em;
            margin: 20px 0;
        }
        
        .temperature {
            font-size: 3em;
            font-weight: 700;
            color: #0984e3;
            margin-bottom: 10px;
        }
        
        .description {
            font-size: 1.2em;
            color: #636e72;
            margin-bottom: 30px;
            text-transform: capitalize;
        }
        
        .weather-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 30px;
        }
        
        .detail-item {
            background: rgba(116, 185, 255, 0.1);
            padding: 15px;
            border-radius: 15px;
        }
        
        .detail-label {
            font-size: 0.9em;
            color: #636e72;
            margin-bottom: 5px;
        }
        
        .detail-value {
            font-size: 1.1em;
            font-weight: 600;
            color: #2d3436;
        }
        
        .error-message {
            color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            display: none;
        }
        
        .loading {
            color: #74b9ff;
            font-size: 1.1em;
            margin-top: 20px;
            display: none;
        }
        
        .sample-cities {
            margin-top: 20px;
        }
        
        .sample-cities h4 {
            color: #636e72;
            margin-bottom: 10px;
            font-size: 0.9em;
        }
        
        .city-btn {
            background: rgba(116, 185, 255, 0.2);
            border: none;
            padding: 8px 15px;
            margin: 5px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9em;
            color: #0984e3;
            transition: all 0.3s ease;
        }
        
        .city-btn:hover {
            background: rgba(116, 185, 255, 0.3);
            transform: translateY(-1px);
        }
    </style>
</head>
<body>
    <div class="weather-container">
        <h1 class="app-title">⛅ Weather App</h1>
        
        <div class="search-container">
            <input type="text" id="cityInput" class="search-input" placeholder="Enter city name..." />
            <button id="searchBtn" class="search-btn">Get Weather</button>
        </div>
        
        <div class="loading" id="loading">🔄 Loading weather data...</div>
        <div class="error-message" id="error"></div>
        
        <div class="weather-info" id="weatherInfo">
            <div class="city-name" id="cityName"></div>
            <div class="weather-icon" id="weatherIcon"></div>
            <div class="temperature" id="temperature"></div>
            <div class="description" id="description"></div>
            
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value" id="feelsLike"></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value" id="humidity"></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value" id="windSpeed"></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value" id="pressure"></div>
                </div>
            </div>
        </div>
        
        <div class="sample-cities">
            <h4>Try these cities:</h4>
            <button class="city-btn" onclick="searchWeather('New York')">New York</button>
            <button class="city-btn" onclick="searchWeather('London')">London</button>
            <button class="city-btn" onclick="searchWeather('Paris')">Paris</button>
            <button class="city-btn" onclick="searchWeather('Tokyo')">Tokyo</button>
            <button class="city-btn" onclick="searchWeather('Sydney')">Sydney</button>
        </div>
    </div>

    <script>
        console.log('=== WEATHER APP SCRIPT START ===');
        
        // Mock weather data for demonstration
        const mockWeatherData = {
            'new york': {
                city: 'New York',
                country: 'US',
                temperature: 22,
                description: 'partly cloudy',
                icon: '⛅',
                feelsLike: 25,
                humidity: 65,
                windSpeed: 12,
                pressure: 1013
            },
            'london': {
                city: 'London',
                country: 'UK',
                temperature: 18,
                description: 'light rain',
                icon: '🌦️',
                feelsLike: 16,
                humidity: 78,
                windSpeed: 8,
                pressure: 1008
            },
            'paris': {
                city: 'Paris',
                country: 'FR',
                temperature: 24,
                description: 'sunny',
                icon: '☀️',
                feelsLike: 26,
                humidity: 55,
                windSpeed: 6,
                pressure: 1018
            },
            'tokyo': {
                city: 'Tokyo',
                country: 'JP',
                temperature: 28,
                description: 'partly cloudy',
                icon: '⛅',
                feelsLike: 31,
                humidity: 72,
                windSpeed: 10,
                pressure: 1015
            },
            'sydney': {
                city: 'Sydney',
                country: 'AU',
                temperature: 20,
                description: 'clear sky',
                icon: '☀️',
                feelsLike: 22,
                humidity: 60,
                windSpeed: 15,
                pressure: 1020
            },
            'berlin': {
                city: 'Berlin',
                country: 'DE',
                temperature: 19,
                description: 'overcast',
                icon: '☁️',
                feelsLike: 17,
                humidity: 70,
                windSpeed: 9,
                pressure: 1012
            },
            'mumbai': {
                city: 'Mumbai',
                country: 'IN',
                temperature: 32,
                description: 'humid',
                icon: '🌫️',
                feelsLike: 38,
                humidity: 85,
                windSpeed: 7,
                pressure: 1005
            }
        };
        
        function showLoading() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('error').style.display = 'none';
            document.getElementById('weatherInfo').classList.remove('show');
        }
        
        function hideLoading() {
            document.getElementById('loading').style.display = 'none';
        }
        
        function showError(message) {
            const errorEl = document.getElementById('error');
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            hideLoading();
        }
        
        function displayWeather(data) {
            console.log('Displaying weather data:', data);
            
            document.getElementById('cityName').textContent = \`\${data.city}, \${data.country}\`;
            document.getElementById('weatherIcon').textContent = data.icon;
            document.getElementById('temperature').textContent = \`\${data.temperature}°C\`;
            document.getElementById('description').textContent = data.description;
            document.getElementById('feelsLike').textContent = \`\${data.feelsLike}°C\`;
            document.getElementById('humidity').textContent = \`\${data.humidity}%\`;
            document.getElementById('windSpeed').textContent = \`\${data.windSpeed} km/h\`;
            document.getElementById('pressure').textContent = \`\${data.pressure} hPa\`;
            
            hideLoading();
            document.getElementById('weatherInfo').classList.add('show');
        }
        
        function searchWeather(cityName) {
            console.log('Searching weather for:', cityName);
            
            if (!cityName || !cityName.trim()) {
                showError('Please enter a city name');
                return;
            }
            
            showLoading();
            
            // Simulate API delay
            setTimeout(() => {
                const normalizedCity = cityName.toLowerCase().trim();
                const weatherData = mockWeatherData[normalizedCity];
                
                if (weatherData) {
                    displayWeather(weatherData);
                } else {
                    showError(\`Weather data not available for "\${cityName}". Try: New York, London, Paris, Tokyo, Sydney, Berlin, or Mumbai.\`);
                }
            }, 1000); // 1 second delay to simulate API call
        }
        
        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== WEATHER APP DOM LOADED ===');
            
            const searchBtn = document.getElementById('searchBtn');
            const cityInput = document.getElementById('cityInput');
            
            // Search button click
            searchBtn.addEventListener('click', function() {
                const city = cityInput.value;
                searchWeather(city);
            });
            
            // Enter key press
            cityInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const city = cityInput.value;
                    searchWeather(city);
                }
            });
            
            console.log('Weather app initialized successfully');
            
            // Auto-search for Paris on load
            setTimeout(() => {
                searchWeather('Paris');
            }, 500);
        });
        
        console.log('=== WEATHER APP SCRIPT END ===');
    </script>
</body>
</html>` 