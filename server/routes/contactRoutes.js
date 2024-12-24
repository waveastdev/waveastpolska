const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/contactController");

// Send a message
// POST /api/message
router.post("/contact", sendMessage)

module.exports = router;