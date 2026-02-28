require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const setLocals = require("./middlewares/locals");

const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "tripgenie_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use(setLocals);

app.use(authRoutes);
app.use(packageRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Not Found",
    message: "The page you are looking for does not exist."
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", {
    title: "Server Error",
    message: "Something went wrong. Please try again."
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`TripGenie running on http://localhost:${PORT}`);
});
