const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind("Connection error"));
db.once("open", () => console.log("Database connected"));

const randItem = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 12; i++) {
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${randItem(cities).city}, ${randItem(cities).state}`,
      title: `${randItem(descriptors)} ${randItem(places)}`,
      image: `https://random-image-pepebigotes.vercel.app/api/random-image`,
      price,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, harum reprehenderit, amet autem, animi alias deserunt quibusdam neque laborum voluptatem facilis? Odit, provident modi vitae iusto veniam ab quibusdam sequiRerum mollitia nam aperiam asperiores aliquid! Harum suscipit quae molestias eius doloribus voluptatibus, dignissimos beatae tempora soluta error ea molestiae natus dolorum! Cupiditate in facilis sed. Molestias reiciendis necessitatibus placeat!Adipisci, autem. Quod sed ad amet voluptatibus distinctio at magni est exercitationem minus officiis, nesciunt accusantium consequuntur! Ipsa nobi",
    });
    await camp.save();
  }
  console.log("Saved");
};

seedDB().then(() => mongoose.connection.close());
