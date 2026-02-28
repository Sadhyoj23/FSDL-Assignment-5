const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    travelType: {
      type: String,
      enum: [
        "adventure",
        "beach",
        "hill station",
        "cultural",
        "relaxation",
        "luxury",
        "family",
        "city",
        "road trip"
      ],
      required: true
    },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    itinerary: { type: String, default: "" },
    activities: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TravelPackage", packageSchema);
