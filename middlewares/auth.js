function ensureAuth(req, res, next) {
  if (req.session.userId) return next();
  return res.redirect("/login");
}

function ensureGuest(req, res, next) {
  if (!req.session.userId) return next();
  return res.redirect("/dashboard");
}

function ensureAdmin(req, res, next) {
  if (req.session.userId && req.session.isAdmin) return next();
  return res.status(403).render("error", {
    title: "Forbidden",
    message: "Admin access required."
  });
}

module.exports = { ensureAuth, ensureGuest, ensureAdmin };
