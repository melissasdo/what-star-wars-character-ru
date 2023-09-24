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
  try {
    const result = await axios.get(API_URL + "people/1");
    res.render("index.ejs", {
      name: result.data.name,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/your-results", async (req, res) => {
  const batperc = req.body.batterypercentage;
  try {
    res.render("your-results.ejs", { batperc: batperc });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
