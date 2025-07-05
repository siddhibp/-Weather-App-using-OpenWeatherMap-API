const apiKey = "a93e887de09865ac2bf8f412a14aeb3a"; // Your OpenWeatherMap API key

async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim(); // Get and clean user input
  const weatherInfo = document.getElementById("weatherInfo");
  const error = document.getElementById("error");

  if (!cityInput) {
    error.textContent = "Please enter a city name.";
    weatherInfo.innerHTML = "";
    return;
  }

  try {
    error.textContent = "Loading...";
    weatherInfo.innerHTML = "";

    // Remove country code so it works globally
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    // Optional: Debug log (open browser console to see it)
    console.log(await response.clone().text());

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, main } = data.weather[0];

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Condition:</strong> ${description}</p>
    `;

    error.textContent = "";

    // Change background based on weather
    document.body.style.backgroundImage = getBackground(main.toLowerCase());

  } catch (err) {
    error.textContent = err.message;
    weatherInfo.innerHTML = "";
    document.body.style.backgroundImage = "";
  }
}

function getBackground(condition) {
  if (condition.includes("cloud")) return "url('https://source.unsplash.com/1600x900/?cloudy')";
  if (condition.includes("rain")) return "url('https://source.unsplash.com/1600x900/?rain')";
  if (condition.includes("clear")) return "url('https://source.unsplash.com/1600x900/?clear,sky')";
  if (condition.includes("snow")) return "url('https://source.unsplash.com/1600x900/?snow')";
  if (condition.includes("storm")) return "url('https://source.unsplash.com/1600x900/?storm')";
  return "url('https://source.unsplash.com/1600x900/?weather')";
}
