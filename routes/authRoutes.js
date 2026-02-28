const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { ensureGuest } = require("../middlewares/auth");

const router = express.Router();

router.get("/register", ensureGuest, (req, res) => {
  res.render("auth/register", { title: "Register" });
});

router.post("/register", ensureGuest, async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    req.session.error = "All fields are required.";
    return res.redirect("/register");
  }

  if (password !== confirmPassword) {
    req.session.error = "Passwords do not match.";
    return res.redirect("/register");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    req.session.error = "Email is already registered.";
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword
  });

  req.session.userId = user._id;
  req.session.user = { id: user._id, name: user.name, email: user.email };
  req.session.isAdmin = user.isAdmin;
  req.session.success = "Welcome to TripGenie.";
  return res.redirect("/dashboard");
});

router.get("/login", ensureGuest, (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.post("/login", ensureGuest, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    req.session.error = "Invalid credentials.";
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.session.error = "Invalid credentials.";
    return res.redirect("/login");
  }

  req.session.userId = user._id;
  req.session.user = { id: user._id, name: user.name, email: user.email };
  req.session.isAdmin = user.isAdmin;
  req.session.success = `Welcome back, ${user.name}.`;
  return res.redirect("/dashboard");
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
