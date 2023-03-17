
const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");


})

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "4f01261800c0e3f483b82172fe5894c6";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {
        console.log(response);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p> The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature at " + query + " is " + temp + " degree celcius </h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })


    })
})


app.listen(3000, function () {
    console.log("Listening at port 3000");
})