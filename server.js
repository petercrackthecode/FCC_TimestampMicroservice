const express = require("express");
const app = express();
const path= require('path');
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC

let cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, "/public")));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "Hello API" });
});

app.get("/api/timestamp", (req, res) => {
  let date= new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let date= req.params.date_string;
  let unix= "", utc= "";
  const specialCharacterTest= new RegExp("\\D");

  if (!specialCharacterTest.test(date)) {
    date= Number(date);
    res.json({
      unix: date,
      utc: (new Date(date)).toUTCString()
    });
  }
  else if (new Date(date) === "Invalid Date") {
    res.json({
      error: 'Invalid Date'
    });
  }
  else {
    unix= (new Date(date)).getTime();
    utc= (new Date(date)).toUTCString();
    res.json({
      unix: unix,
      utc: utc
    });
  }
});

app.listen(process.env.PORT, (error) => {
  console.log(error ? error : `Your app is running at ${process.env.PORT} port`);
});

