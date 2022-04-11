if ("geolocation" in navigator) {
  console.log("Geolocation Available");
  navigator.geolocation.getCurrentPosition(async function (position) {
    console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.querySelectorAll("span")[0].textContent = lat;
    document.querySelectorAll("span")[1].textContent = lon;

    const temperature = document.querySelector(".temperature");
    const summary = document.querySelector(".summary");
    const airq = document.querySelector(".pm");
    const api_url = `weather/${lat},${lon}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    const air = json.air_quality.list[0].components.pm2_5;
    airq.textContent = air;
    const weather = json.weather.weather[0].main;
    summary.textContent = weather;
    const temp = (parseFloat(json.weather.main.temp) - 273).toFixed(1);
    temperature.textContent = temp;
    const data = { lat, lon, weather, air, temp };
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/api", options).then((db_response) => {
      db_response.json().then((db_data) => console.log(db_data));
    });
  });
} else {
  console.log("Geolocation Not Available");
}
