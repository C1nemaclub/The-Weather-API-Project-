var map = L.map("issMap").setView([0, 0], 1);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiY2luZW1hY2x1YiIsImEiOiJjbDE2MGh2dDgwMGhjM2Ntd3ZodG14NW5hIn0.F_WC5KyWuTfyfFlFSgFbcQ",
  }
).addTo(map);

getData();

function getData() {
  fetch("/api")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const marker = new L.marker([item.lat, item.lon]).addTo(map);

        const text = `The Weather here is ${
          item.weather
        } with a temperature of ${item.temp} C.
        The concentration of particular matter is ${item.air}Pm At ${
          (item.lat, item.lon)
        }`;

        marker.bindPopup(text);

        /*
        const root = document.createElement("div");
        const geo = document.createElement("div");
        const date = document.createElement("div");
        const weather = document.createElement("div");
        const airQ = document.createElement("div");
        const temp = document.createElement("div");

        root.classList.add("container");
        geo.textContent = `Latitude: ${item.lat}°, Longitude:  ${item.lon}°`;
        dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = `Date: ${dateString}`;
        weather.textContent = `Weather is: ${item.weather}`;
        airQ.textContent = `Air quality: ${item.air}`;
        temp.textContent = `Temperature: ${item.temp}`;
        root.append(geo, date, weather, airQ, temp);
        document.body.append(root);
*/
      });

      console.log(data);
    });
}
