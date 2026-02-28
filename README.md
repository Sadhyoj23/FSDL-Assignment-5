# TripGenie - AI Powered Smart Travel Planner

Full-stack futuristic travel agency web app built with Node.js, Express.js, MongoDB, EJS, CSS, and JavaScript.

## Features

- User authentication with hashed passwords and sessions
- Personalized user dashboard after login
- Smart travel planner based on budget, days, travel type, and travelers
- Travel package explorer with search, filtering, and sorting
- Booking system with booking history
- Favorites system
- Reviews and dynamic average ratings
- Secure admin dashboard for package/review/user/booking management
- Futuristic dark UI with glassmorphism, neon effects, and responsive layout

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS
- HTML/CSS/JavaScript

## Project Structure

- `Assignment 5/server.js`
- `Assignment 5/models`
- `Assignment 5/routes`
- `Assignment 5/views`
- `Assignment 5/public`
- `Assignment 5/config`
- `Assignment 5/middlewares`
- `Assignment 5/scripts/seed.js`

## Run Instructions

1. Open terminal in `Assignment 5`.
2. Install dependencies:
   - `npm install`
3. Create `.env` using `.env.example`.
4. Ensure MongoDB is running locally (or update `MONGO_URI`).
5. Optional seed:
   - `npm run seed`
6. Run app:
   - `npm run dev`
   - or `npm start`
7. Open:
   - `http://localhost:5000`

## Seed Admin Account

- Email: `admin@tripgenie.com`
- Password: `admin123`
