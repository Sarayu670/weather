

const apiKey = "4a802ffcd13fb5710310b5d02bbc9fc1";

async function getWeather() {
    let city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apiKey}&units=metric`;

    console.log("Fetching data from:", url); 
    try {
        let response = await fetch(url);
        console.log("Response status:", response.status); 

        if (!response.ok) {
            throw new Error(`City not found!`);
        }

        let data = await response.json();
        console.log("API Response:", data);

        // Extract forecast for the next 5 days (every 24 hours)
        let forecastHTML = `<h3>5-Day Forecast for ${data.city.name}</h3><div class="forecast-container">`;
        for (let i = 0; i < data.list.length; i += 8) { // Every 8th record is for the next day at the same time
            let day = data.list[i];
            forecastHTML += `
                <div class="forecast-day">
                    <p><strong>${day.dt_txt.split(" ")[0]}</strong></p>
                    <p>🌡 Temperature: ${day.main.temp}°C</p>
                    <p>☁ Weather: ${day.weather[0].description}</p>
                    <p>💧 Humidity: ${day.main.humidity}%</p>
                </div>
            `;
        }
        forecastHTML += `</div>`;

        document.getElementById("weather-result").innerHTML = forecastHTML;

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("weather-result").innerHTML = `<p>${error.message}</p>`;
    }
}