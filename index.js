import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://swapi.dev/api/";

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs"); /* installing ejs */

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

function calcResult(batteryPercentage, year) {
  const randomNumber = Math.floor(Math.random() * 83) + 1;

  if (batteryPercentage + year > 83) {
    return randomNumber;
  } else {
    return batteryPercentage + year;
  }
}

app.post("/your-results", async (req, res) => {
  const resCharacter = calcResult(req.body.batterypercentage, req.body.year);

  try {
    const result = await axios.get(API_URL + "people/" + resCharacter);
    res.render("your-results.ejs", { name: result.data.name });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
    res.render("your-results.ejs", {
      content: JSON.stringify(error.response.data),
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
