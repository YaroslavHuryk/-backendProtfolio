// routes/announcements.js
const express = require("express");
const multer = require("multer");

const {
  createProject,
  getProjects,
} = require("../controllers/announcementController");

const contactController = require('../controllers/contactController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// router.post("/", upload.single("image"), createProject);
router.get("/", getProjects);
router.post('/', contactController.sendTelegramMessage);

module.exports = router;
