const User = require("../models/User");

async function getActorUserId(req) {
  if (req.session.userId) return req.session.userId;
  if (req.session.guestUserId) return req.session.guestUserId;

  const guestEmail = `guest_${req.sessionID}@tripgenie.local`;
  let guest = await User.findOne({ email: guestEmail });

  if (!guest) {
    guest = await User.create({
      name: "Guest User",
      email: guestEmail,
      password: `guest_${req.sessionID}`,
      isAdmin: false
    });
  }

  req.session.guestUserId = guest._id;
  return guest._id;
}

module.exports = { getActorUserId };
