require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");
const TravelPackage = require("../models/TravelPackage");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});
  await TravelPackage.deleteMany({});

  const adminPassword = await bcrypt.hash("admin123", 10);
  await User.create({
    name: "Admin",
    email: "admin@tripgenie.com",
    password: adminPassword,
    isAdmin: true
  });

  await TravelPackage.insertMany([
    {
      title: "Aurora Quest Iceland",
      destination: "Reykjavik, Iceland",
      travelType: "adventure",
      price: 1800,
      duration: 6,
      description: "Glacier hikes, volcano trails, and northern lights photography.",
      image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 city walk, Day 2 glacier trek, Day 3 geothermal springs, Day 4 volcano route, Day 5 aurora camp, Day 6 leisure.",
      activities: ["Glacier Hiking", "Aurora Viewing", "Blue Lagoon"],
      rating: 4.7
    },
    {
      title: "Maldives Luxe Escape",
      destination: "Maldives",
      travelType: "beach",
      price: 2200,
      duration: 5,
      description: "Private water villas, coral dives, and sunset cruises.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 welcome retreat, Day 2 snorkel reefs, Day 3 island hopping, Day 4 spa and cruise, Day 5 departure.",
      activities: ["Snorkeling", "Island Hopping", "Spa"],
      rating: 4.8
    },
    {
      title: "Himalayan Serenity",
      destination: "Manali, India",
      travelType: "hill station",
      price: 650,
      duration: 4,
      description: "Mountain views, pine forests, and cafe trails.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 local tour, Day 2 Solang Valley, Day 3 temple and market walk, Day 4 return.",
      activities: ["Valley Visit", "Paragliding", "Local Cuisine"],
      rating: 4.4
    },
    {
      title: "Kyoto Cultural Pulse",
      destination: "Kyoto, Japan",
      travelType: "cultural",
      price: 1500,
      duration: 5,
      description: "Temples, tea ceremonies, and timeless districts.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 Gion district, Day 2 Fushimi Inari, Day 3 Arashiyama, Day 4 tea and craft class, Day 5 leisure.",
      activities: ["Temple Tour", "Tea Ceremony", "Street Food Walk"],
      rating: 4.6
    },
    {
      title: "Bali Mindful Retreat",
      destination: "Ubud, Bali",
      travelType: "relaxation",
      price: 980,
      duration: 5,
      description: "Yoga mornings, waterfall visits, and wellness therapies.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 resort check-in, Day 2 yoga and spa, Day 3 waterfall tour, Day 4 river rafting lite, Day 5 rest.",
      activities: ["Yoga", "Spa", "Nature Walk"],
      rating: 4.5
    },
    {
      title: "Santorini Sunset Escape",
      destination: "Santorini, Greece",
      travelType: "beach",
      price: 1700,
      duration: 5,
      description: "Clifftop villages, caldera cruises, and golden-hour viewpoints.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 Oia walk, Day 2 catamaran cruise, Day 3 beach day, Day 4 winery and sunset point, Day 5 departure.",
      activities: ["Sunset Cruise", "Village Walk", "Wine Tasting"],
      rating: 4.7
    },
    {
      title: "Swiss Alpine Explorer",
      destination: "Interlaken, Switzerland",
      travelType: "adventure",
      price: 2100,
      duration: 6,
      description: "Alpine trains, glacier viewpoints, and thrilling mountain activities.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 lakeside orientation, Day 2 Jungfrau excursion, Day 3 canyoning, Day 4 Lauterbrunnen valley, Day 5 alpine village tour, Day 6 departure.",
      activities: ["Scenic Train", "Canyoning", "Mountain Cable Car"],
      rating: 4.8
    },
    {
      title: "Dubai Skyline Luxe",
      destination: "Dubai, UAE",
      travelType: "luxury",
      price: 1950,
      duration: 4,
      description: "Iconic skyscrapers, desert adventures, and premium dining.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 downtown highlights, Day 2 desert safari, Day 3 marina and beach, Day 4 shopping and departure.",
      activities: ["Desert Safari", "Burj Visit", "Luxury Dining"],
      rating: 4.6
    },
    {
      title: "Cappadocia Sky Trails",
      destination: "Cappadocia, Turkey",
      travelType: "adventure",
      price: 1400,
      duration: 5,
      description: "Fairy chimneys, cave stays, and sunrise balloon landscapes.",
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 cave hotel check-in, Day 2 hot air balloon, Day 3 valley hike, Day 4 underground city tour, Day 5 departure.",
      activities: ["Hot Air Balloon", "Valley Trek", "Cave Hotel Stay"],
      rating: 4.7
    },
    {
      title: "Banff Wilderness Trail",
      destination: "Banff, Canada",
      travelType: "hill station",
      price: 1600,
      duration: 5,
      description: "Emerald lakes, forest trails, and glacier-fed panoramas.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 Banff town stroll, Day 2 Lake Louise, Day 3 Moraine Lake and canoeing, Day 4 gondola and hikes, Day 5 departure.",
      activities: ["Lake Canoeing", "Nature Hike", "Gondola Ride"],
      rating: 4.8
    },
    {
      title: "Marrakech Heritage Maze",
      destination: "Marrakech, Morocco",
      travelType: "cultural",
      price: 1100,
      duration: 4,
      description: "Colorful souks, riad living, and timeless heritage architecture.",
      image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 medina exploration, Day 2 palace and gardens, Day 3 atlas day trip, Day 4 departure.",
      activities: ["Souk Tour", "Palace Visit", "Traditional Cuisine"],
      rating: 4.5
    },
    {
      title: "Phuket Family Waves",
      destination: "Phuket, Thailand",
      travelType: "family",
      price: 900,
      duration: 5,
      description: "Kid-friendly beaches, island tours, and easy-paced activities.",
      image: "https://images.unsplash.com/photo-1589395595558-9e8f5d4e85b2?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 beachside arrival, Day 2 family island tour, Day 3 aquarium and market, Day 4 water activities, Day 5 departure.",
      activities: ["Island Tour", "Beach Games", "Aquarium Visit"],
      rating: 4.4
    },
    {
      title: "Queenstown Thrill Circuit",
      destination: "Queenstown, New Zealand",
      travelType: "adventure",
      price: 2300,
      duration: 6,
      description: "Adrenaline sports, alpine drives, and cinematic landscapes.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 lakefront orientation, Day 2 bungee and luge, Day 3 Milford Sound cruise, Day 4 hiking trails, Day 5 scenic road trip, Day 6 departure.",
      activities: ["Bungee Jump", "Cruise", "Mountain Hike"],
      rating: 4.9
    },
    {
      title: "Lisbon Coastal Charm",
      destination: "Lisbon, Portugal",
      travelType: "city",
      price: 1250,
      duration: 4,
      description: "Tram-lined streets, oceanfront viewpoints, and rich local flavors.",
      image: "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 old town and tram ride, Day 2 Belem district, Day 3 Sintra day trip, Day 4 departure.",
      activities: ["City Tram", "Coastal Walk", "Pastel Tasting"],
      rating: 4.5
    },
    {
      title: "Ladakh High Pass Odyssey",
      destination: "Leh-Ladakh, India",
      travelType: "road trip",
      price: 1150,
      duration: 6,
      description: "High-altitude monasteries, dramatic passes, and stargazing camps.",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      itinerary: "Day 1 acclimatization in Leh, Day 2 monastery circuit, Day 3 Nubra Valley, Day 4 Pangong Lake, Day 5 local markets, Day 6 departure.",
      activities: ["Monastery Tour", "Lake Camp", "Scenic Drive"],
      rating: 4.8
    }
  ]);

  console.log("Seed completed. Admin login: admin@tripgenie.com / admin123");
  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
