// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
// console.log("MONGO_URI:", process.env.MONGO_URI);
// const connectDB = require("./config/db");
// connectDB();
// const express = require("express");
// const cors = require("cors");
// const cvController = require("./controllers/announcementController");
// const app = express();
// // const allowedOrigins = [
// //   'http://localhost:5173',
// //   'https://portfolio-yaroslav-huryk.vercel.app' // Вкажіть ваш основний домен прямо
// // ];
// app.use(cors({
//   origin: 'https://portfolio-yaroslav-huryk.vercel.app', // Тільки основний домен без /
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//   credentials: true,
//   optionsSuccessStatus: 200 // Важливо для старих браузерів та деяких сервісів
// }));

// // 2. Додатковий заголовок (про всяк випадок)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://portfolio-yaroslav-huryk.vercel.app");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// //   origin: function (origin, callback) {
// //     // Дозволяємо запити без origin (наприклад, серверні запити)
// //     if (!origin) return callback(null, true);
    
// //     if (allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       console.log("Blocked by CORS:", origin); // Додайте лог для відладки
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true
// // }));
// app.use(express.json());
// app.use("/api/announcements", require("./routes/announcements"));
// app.use("/api/contact", require("./routes/announcements"));

// app.get("/api/test", (req, res) => {
//   res.json({ ok: true });
// });

// app.get("/api/cv/download", cvController.getCV);

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// });
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const connectDB = require("./config/db");
const cvController = require("./controllers/announcementController");

// Ініціалізація БД
connectDB();

// Конфігурація Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// --- НАЛАШТУВАННЯ CORS (ТІЛЬКИ ОДИН РАЗ) ---
// app.use(cors({
//   origin: ['https://portfolio-yaroslav-huryk.vercel.app', 'http://localhost:5173'], // Дозволяємо обидва домени
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//   credentials: true,
//   optionsSuccessStatus: 200
// }));

const allowedOrigins = [
  'https://portfolio-yaroslav-huryk.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // дозволяємо запити без origin (наприклад, Postman або мобільні додатки)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// --- MIDDLEWARE ---
app.use(express.json());

// --- МАРШРУТИ ---
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/contact", require("./routes/announcements"));

app.get("/api/test", (req, res) => {
  res.json({ ok: true, message: "Backend is working!" });
});

app.get("/api/cv/download", cvController.getCV);

// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 10000; // Render любить порт 10000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});