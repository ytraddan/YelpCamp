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
  for (let i = 0; i < 180; i++) {
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "671ce14050f72fb025cf62d7",
      location: `${randItem(cities).city}, ${randItem(cities).state}`,
      title: `${randItem(descriptors)} ${randItem(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          randItem(cities).longitude,
          randItem(cities).latitude,
        ],
      },
      images: [
        {
          url: `https://res.cloudinary.com/drffwmaqm/image/upload/v1730028170/YelpCamp/fqig8fucbvjztmlpa4yd.jpg`,
          filename: "YelpCamp/fqig8fucbvjztmlpa4yd",
        },
        {
          url: "https://res.cloudinary.com/drffwmaqm/image/upload/v1730028170/YelpCamp/jow4wb9zqlgcbzx87cbt.jpg",
          filename: "YelpCamp/jow4wb9zqlgcbzx87cbt",
        },
      ],
      price,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, harum reprehenderit, amet autem, animi alias deserunt quibusdam neque laborum voluptatem facilis? Odit, provident modi vitae iusto veniam ab quibusdam sequiRerum mollitia nam aperiam asperiores aliquid! Harum suscipit quae molestias eius doloribus voluptatibus, dignissimos beatae tempora soluta error ea molestiae natus dolorum! Cupiditate in facilis sed. Molestias reiciendis necessitatibus placeat!Adipisci, autem. Quod sed ad amet voluptatibus distinctio at magni est exercitationem minus officiis, nesciunt accusantium consequuntur! Ipsa nobi",
    });
    await camp.save();
  }
  console.log("Saved");
};

seedDB().then(() => mongoose.connection.close());
