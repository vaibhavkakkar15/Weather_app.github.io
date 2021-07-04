const express = require('express');

// const bodyParser = require('body-parser');

const app = express();

const https = require('https');


var bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
    const query = req.body.CityName;
    const apiKey = "83a7e2e58563371beaba8297c12ae17e";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = ("http://openweathermap.org/img/wn/" + icon + "@2x.png")

            console.log(weatherDescription);
            res.write("<h1>The temperature in   " + query + "right now is " + temp + " degrees celcius</h1>");
            res.write("<p> The weather is currently " + weatherDescription + "</p>")
            res.write("<img src=" + iconUrl + ">");
            res.send();


        })

    })

})





app.listen(3000, function() {
    console.log("server 3000");
})




// const object = {
//     name: "vaibhav",
//     favfood: "nothing"
// }

// it will change javascript object to string so it will take shortest space
//console.log(JSON.stringify(object));
// we can only have one send method. 
// res.send("hello");