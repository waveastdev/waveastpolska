const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/newsletterController");

// Send Email
// POST /api/newsletter
router.post("/newsletter", sendEmail)

module.exports = router;