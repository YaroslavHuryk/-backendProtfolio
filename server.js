require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("MONGO_URI:", process.env.MONGO_URI);
const connectDB = require("./config/db");
connectDB();
const express = require("express");
const cors = require("cors");
const cvController = require("./controllers/announcementController");
const app = express();
const allowedOrigins = [
  'http://localhost:5173',                         // Для розробки
  process.env.VERCEL_URL    // Для продакшну
];

app.use(cors({
  origin: function (origin, callback) {
    // Дозволяємо запити без origin (наприклад, Postman або мобільні додатки)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/contact", require("./routes/announcements"));

app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/cv/download", cvController.getCV);

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});