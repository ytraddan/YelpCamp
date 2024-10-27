const express = require("express");
const catchAsync = require("../utilities/CatchAsync");
const campgrounds = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

const router = express.Router();

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampgound))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampgound)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampgound));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
