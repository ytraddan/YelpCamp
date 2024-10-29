maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/dataviz-dark/style.json?key=z7414bsIC3LZ4xzeJpcq",
  center: campground.geometry.coordinates,
  zoom: 6,
});

new maptilersdk.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h3 style="color:gray">${campground.title}</h3><p style="color:gray">${campground.location}</p>`
    )
  )
  .addTo(map);
