const fetch = require("node-fetch");
const express = require("express");
const app = express();
const Datastore = require("nedb");
require("dotenv").config();

const dataBase = new Datastore("database.db");
dataBase.loadDatabase();

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.get("/api", (request, response) => {
  dataBase.find({}, (error, data) => {
    if (error) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log("I got a request!");
  const timestamp = Date.now();
  const data = request.body;
  data.timestamp = timestamp;
  dataBase.insert(data);
  response.json(data);
});

app.get("/weather/:latlon", async (request, response) => {
  console.log(request.params);
  const latlon = request.params.latlon.split(",");
  console.log(latlon);
  lat = latlon[0];
  lon = latlon[1];
  console.log(lat, lon);
  const api_key = process.env.API_KEY;

  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const aq_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data,
  };
  response.json(data);
});
