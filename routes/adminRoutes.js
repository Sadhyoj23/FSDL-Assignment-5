const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const TravelPackage = require("../models/TravelPackage");
const { ensureAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin", ensureAdmin, async (req, res) => {
  const [users, bookings, packages, reviews] = await Promise.all([
    User.find().sort({ createdAt: -1 }),
    Booking.find().populate("userId packageId").sort({ createdAt: -1 }),
    TravelPackage.find().sort({ createdAt: -1 }),
    Review.find().populate("userId packageId").sort({ createdAt: -1 })
  ]);

  res.render("admin/index", {
    title: "Admin Dashboard",
    users,
    bookings,
    packages,
    reviews
  });
});

router.post("/admin/packages", ensureAdmin, async (req, res) => {
  const { title, destination, travelType, price, duration, description, image, itinerary, activities } = req.body;
  await TravelPackage.create({
    title,
    destination,
    travelType,
    price,
    duration,
    description,
    image,
    itinerary,
    activities: activities ? activities.split(",").map((a) => a.trim()) : []
  });
  req.session.success = "Package added.";
  return res.redirect("/admin");
});

router.post("/admin/packages/:id/update", ensureAdmin, async (req, res) => {
  const { title, destination, travelType, price, duration, description, image, itinerary, activities } = req.body;
  await TravelPackage.findByIdAndUpdate(req.params.id, {
    title,
    destination,
    travelType,
    price,
    duration,
    description,
    image,
    itinerary,
    activities: activities ? activities.split(",").map((a) => a.trim()) : []
  });
  req.session.success = "Package updated.";
  return res.redirect("/admin");
});

router.post("/admin/packages/:id/delete", ensureAdmin, async (req, res) => {
  await TravelPackage.findByIdAndDelete(req.params.id);
  req.session.success = "Package deleted.";
  return res.redirect("/admin");
});

router.post("/admin/reviews/:id/delete", ensureAdmin, async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  req.session.success = "Review deleted.";
  return res.redirect("/admin");
});

module.exports = router;
