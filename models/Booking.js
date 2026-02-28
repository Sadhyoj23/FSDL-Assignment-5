const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "TravelPackage", required: true },
    travelDate: { type: Date, required: true },
    status: { type: String, enum: ["confirmed", "pending", "cancelled"], default: "confirmed" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
