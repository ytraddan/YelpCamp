const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

// Show All Campgrounds
module.exports.index = async (req, res, next) => {
  const campgrounds = await Campground.find();
  res.render("campgrounds/index", { campgrounds });
};

// Show New Capmground Form
module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

// Create New Capmground
module.exports.createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  req.flash("success", "Successfully made your campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

// Show Campground
module.exports.showCampgound = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find that campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

// Show Edit Campground Form
module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground");
    return res.redirect("/campgrounds");
  }

  res.render("campgrounds/edit", { campground });
};

// Update Campground
module.exports.updateCampgound = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.images.push(...images);
  await campground.save();
  if (req.body.deleteImages) {
    req.body.deleteImages.forEach(async (filename) => {
      await cloudinary.uploader.destroy(filename);
    });
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    console.log(req.body.deleteImages);
  }
  req.flash("success", "Successfully updated your campground!");
  res.redirect(`/campgrounds/${id}`);
};

// Delete Campground
module.exports.deleteCampgound = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "Don't have permisson to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted your campground!");
  res.redirect("/campgrounds");
};
