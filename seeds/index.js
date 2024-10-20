const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { decriptors, places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind((console, "Connection error")));
db.once("open", () => console.log("Database connected"));

const randItem = (array) => array[Math.floor(Math.random() * array.length)];

const seeDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; i++) {
    const camp = new Campground({
      location: `${randItem(cities).city}, ${randItem(cities).state}`,
      title: `${randItem(descriptors)} ${randItem(places)}`,
    });
    await camp.save();
  }
  console.log("Saved");
};

seeDB().then(()=>mongoose.connection.close())
