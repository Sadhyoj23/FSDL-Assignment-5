const express = require("express");
const TravelPackage = require("../models/TravelPackage");
const Review = require("../models/Review");
const Favorite = require("../models/Favorite");
const { getActorUserId } = require("../utils/actorUser");

const router = express.Router();

router.get("/", async (req, res) => {
  const featured = await TravelPackage.find().sort({ rating: -1, createdAt: -1 });
  res.render("index", { title: "TripGenie", featured });
});

router.get("/packages", async (req, res) => {
  const { q, type, sort } = req.query;
  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { destination: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  if (type) filter.travelType = type;

  let sortBy = { createdAt: -1 };
  if (sort === "price_asc") sortBy = { price: 1 };
  if (sort === "price_desc") sortBy = { price: -1 };
  if (sort === "rating_desc") sortBy = { rating: -1 };
  if (sort === "duration_asc") sortBy = { duration: 1 };
  if (sort === "duration_desc") sortBy = { duration: -1 };

  const packages = await TravelPackage.find(filter).sort(sortBy);
  const actorId = req.session.userId || req.session.guestUserId;
  const favoriteIds = actorId
    ? (await Favorite.find({ userId: actorId })).map((f) => String(f.packageId))
    : [];

  res.render("packages/list", {
    title: "Travel Packages",
    packages,
    filters: { q: q || "", type: type || "", sort: sort || "" },
    favoriteIds
  });
});

router.get("/packages/:id", async (req, res) => {
  const pkg = await TravelPackage.findById(req.params.id);
  if (!pkg) {
    return res.status(404).render("error", { title: "Not Found", message: "Package not found." });
  }

  const reviews = await Review.find({ packageId: pkg._id }).populate("userId", "name").sort({ createdAt: -1 });

  const actorId = req.session.userId || req.session.guestUserId;
  let isFavorite = false;
  if (actorId) {
    const favorite = await Favorite.findOne({ userId: actorId, packageId: pkg._id });
    isFavorite = Boolean(favorite);
  }

  res.render("packages/detail", { title: pkg.title, pkg, reviews, isFavorite });
});

router.post("/packages/:id/reviews", async (req, res) => {
  const { rating, comment } = req.body;
  const packageId = req.params.id;
  const userId = await getActorUserId(req);

  await Review.findOneAndUpdate(
    { userId, packageId },
    { userId, packageId, rating: Number(rating), comment },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const allReviews = await Review.find({ packageId });
  const avg = allReviews.length
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : 0;

  await TravelPackage.findByIdAndUpdate(packageId, {
    rating: Number(avg.toFixed(1)),
    reviewsCount: allReviews.length
  });

  req.session.success = "Review submitted.";
  return res.redirect(`/packages/${packageId}`);
});

module.exports = router;
