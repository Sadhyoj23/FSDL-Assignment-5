const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "TravelPackage", required: true }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, packageId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
