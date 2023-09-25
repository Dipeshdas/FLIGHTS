const express = require("express");
const { MongoClient } = require("mongodb");
const ejs = require("ejs"); // Require EJS
const path = require("path");

const app = express();
const port = 8080;

const url =
  "mongodb+srv://dipeshdas:Dipesh%409547@cluster0.5l58g46.mongodb.net/";
const dbName = "Trip";

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/trips", async (req, res) => {
  let client;
  try {
    client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("trips");

    // Extract form data from req.query
    const source = req.query.source;
    const destination = req.query.destination;
    const departureDate = req.query["departure-date"];
    const returnDate = req.query["return-date"];
    const flightClass = req.query["flight-class"];

    // Build your database query based on the form data
    const query = {
      source: source,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      flightClass: flightClass,
    };
    console.log(query);

    const trips = await collection.find(query).toArray();
    res.render("trips", { trips });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
