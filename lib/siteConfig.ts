export const siteConfig = {
  name: "Naari Homestay",
  tagline: "Home-Stays-Home • Mathura",
  phone: "919359923689",
  phoneFormatted: "+91 93599 23689",
  email: "naarihomestay@gmail.com",
  address: "64/598, Chowki Baghbahadur, Dampier Nagar, Mathura",
  location: "Mathura, Uttar Pradesh",
  mapLink: "https://www.google.com/maps/dir/?api=1&destination=Naari+Homestay+Mathura",
  whatsappMsg: encodeURIComponent(
    "Jai Shri Krishna! I'm planning a Mathura trip. Can you check room availability and share photos/prices for my family stay?"
  ),
  scarcity: {
    weekend: "🔥 Weekend Rush: Only 2 Deluxe rooms left for this Saturday.",
    festival: "🙏 Yatra Season: 85% of rooms booked for upcoming Ekadashi. Book now to secure your peace of mind.",
    normal: "✨ Usually booked 3 days in advance. 4 families viewed this property in the last hour."
  },
  coordinates: {
    lat: 27.4924,
    lng: 77.6737
  },
  amenities: [
    "Luxury AC Rooms with 100% Power Backup",
    "Pet-Friendly Stay (Dogs & Cats Welcome)",
    "Room Kitchenette (Fridge & Coffee Maker available)",
    "Free High-Speed WiFi in All Rooms",
    "On-site Grocery Shop & Storage",
    "24-hr Pure Vegetarian Home-style Meals",
    "Free Secure On-site Parking",
    "Travel Desk (Shuttle Service & Car Rental)",
    "Daily Housekeeping & Turndown Service",
    "24-hr Hot & Cold Water (Geyser)",
    "Satellite TV with Cable Connection",
    "UPI & Digital Payment Options",
    "Kid-Friendly Activities & Safe Zone",
    "Smoke-Free Property Environment",
    "Opp. Police Chowki (High Safety Zone)",
    "Doctor On Call (24/7)"
  ],
  landmarks: [
    { name: "Shri Krishna Janmabhoomi", distance: "1.2 km", time: "5 min" },
    { name: "Mathura Junction", distance: "2 km", time: "8 min" },
    { name: "Dwarkadhish Temple", distance: "1.5 km", time: "6 min" },
    { name: "Banke Bihari (Vrindavan)", distance: "10 km", time: "25 min" }
  ],
  reviews: [
    {
      id: 1,
      name: "Yashasvi Dhamane",
      location: "Verified Guest",
      text: "Our stay at Naari was exceptional. The rooms were clean, comfortable, and very welcoming. The peaceful setting made it ideal for relaxation after temple visits. The owner’s friendly nature and helpful guidance about local attractions added great value to our trip.",
      image: "/assets/testimonials/yashasvi.png",
      rating: 5,
      tag: "Family Pilgrimage",
    },
    {
      id: 2,
      name: "Tanmay Rao",
      location: "Verified Guest",
      text: "Excellent Experience! The property is well-maintained and perfectly located near major shrines. What truly stood out was the hospitality of the host family – they were warm, helpful, and went out of their way to ensure we had everything we needed.",
      image: "/assets/testimonials/tanmay.png",
      rating: 5,
      tag: "Solo Traveler",
    },
    {
      id: 3,
      name: "Asha",
      location: "Verified Guest",
      text: "Stayed for 2 days and loved the family. Shweta didi and Girhari Sir helped us with an itinerary which was so accurate that we avoided the crowds. Homely breakfast and dinner were delicious. Highly recommend for family stays.",
      image: "/assets/testimonials/asha.png",
      rating: 5,
      tag: "Family Stay",
    },
    {
      id: 4,
      name: "Jatin Zade",
      location: "Verified Guest",
      text: "I had a delightful stay. The rooms were spotless, cozy, and gave a real homely vibe. The calm environment made it a great place to unwind. Plus, the location is unbeatable with easy access to all major attractions.",
      image: "/assets/testimonials/jatin.png",
      rating: 5,
      tag: "Spiritual Tour",
    },
    {
      id: 5,
      name: "Vaibhav",
      location: "Verified Guest",
      text: "Staying at Naari Homestay was one of the highlights of our trip. The rooms had a warmth that instantly made us feel at home. Perfect escape from travel fatigue with incredibly welcoming staff.",
      image: "/assets/testimonials/vaibhav.png",
      rating: 5,
      tag: "Group Visit",
    }
  ],
  packages: [
    {
      name: "Family Darshan Package",
      desc: "Stress-free pilgrimage for the whole family.",
      includes: ["2 Nights in Family Suite", "All Meals (Home-style)", "Morning Temple Guide", "Mathura Jn. Pickup/Drop"],
      price: "10,999",
      bestFor: "Families with elders/kids"
    },
    {
      name: "Weekend Peace Stay",
      desc: "Quick spiritual recharge for busy professionals.",
      includes: ["1 Night in King Deluxe", "Breakfast & Welcome Tea", "Personalized Darshan Route Plan", "Late Checkout"],
      price: "3,499",
      bestFor: "Solo travelers & Couples"
    }
  ],
  addons: [
    { id: "thali", name: "Satvik Thali (Lunch/Dinner)", price: "180", desc: "Purely vegetarian, home-cooked meal." },
    { id: "auto", name: "Full-Day Darshan Auto", price: "850", desc: "Trusted driver covering all main temples." },
    { id: "pickup", name: "Mathura Jn. Pickup/Drop", price: "250", desc: "Safe, priority transport from the station." },
    { id: "late", name: "Late Checkout (till 6 PM)", price: "500", desc: "Perfect for seeing evening Aarti before leaving." }
  ]
};
