const express = require("express");
const catchAsync = require("../utilities/CatchAsync");
const campgrounds = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });

const router = express.Router();

// Show All Campgrounds/ Add New Campground
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("images"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// Show/Edit/Delete Campground
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampgound))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("images"),
    validateCampground,
    catchAsync(campgrounds.updateCampgound)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampgound));

// Show Campground Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
