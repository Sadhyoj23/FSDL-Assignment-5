const express = require("express");
const TravelPackage = require("../models/TravelPackage");
const Booking = require("../models/Booking");
const Favorite = require("../models/Favorite");
const { getActorUserId } = require("../utils/actorUser");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  const actorId = req.session.userId || req.session.guestUserId;
  const recommendationsPromise = TravelPackage.find().sort({ rating: -1 }).limit(4);

  if (!actorId) {
    const recommendations = await recommendationsPromise;
    return res.render("dashboard/index", {
      title: "Dashboard",
      bookings: [],
      favorites: [],
      recommendations
    });
  }

  const [bookings, favorites, recommendations] = await Promise.all([
    Booking.find({ userId: actorId }).populate("packageId").sort({ createdAt: -1 }),
    Favorite.find({ userId: actorId }).populate("packageId"),
    recommendationsPromise
  ]);

  return res.render("dashboard/index", { title: "Dashboard", bookings, favorites, recommendations });
});

router.post("/planner", async (req, res) => {
  const { budget, days, travelType, travelers } = req.body;
  const maxPricePerPerson = Number(budget) / Math.max(Number(travelers), 1);

  const matches = await TravelPackage.find({
    travelType,
    duration: { $lte: Number(days) + 1 },
    price: { $lte: maxPricePerPerson }
  })
    .sort({ rating: -1, price: 1 })
    .limit(5);

  res.render("dashboard/planner-results", {
    title: "Smart Planner Results",
    criteria: { budget, days, travelType, travelers },
    matches
  });
});

router.post("/bookings/:packageId", async (req, res) => {
  const { travelDate } = req.body;
  const userId = await getActorUserId(req);

  await Booking.create({
    userId,
    packageId: req.params.packageId,
    travelDate,
    status: "confirmed"
  });
  req.session.success = req.session.userId
    ? "Booking confirmed."
    : "Booking confirmed for guest mode (saved for this browser session).";
  return res.redirect("/dashboard");
});

router.post("/favorites/:packageId", async (req, res) => {
  const userId = await getActorUserId(req);

  await Favorite.findOneAndUpdate(
    { userId, packageId: req.params.packageId },
    { userId, packageId: req.params.packageId },
    { upsert: true, new: true }
  );
  req.session.success = "Added to favorites.";
  return res.redirect(req.get("referer") || "/packages");
});

router.post("/favorites/:packageId/remove", async (req, res) => {
  const actorId = req.session.userId || req.session.guestUserId;
  if (!actorId) {
    req.session.error = "No favorites found for this session.";
    return res.redirect(req.get("referer") || "/dashboard");
  }

  await Favorite.findOneAndDelete({
    userId: actorId,
    packageId: req.params.packageId
  });
  req.session.success = "Removed from favorites.";
  return res.redirect(req.get("referer") || "/dashboard");
});

module.exports = router;
