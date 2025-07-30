const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");
const auth = require("../middlewares/authMiddleware");

console.log("Auth Middleware Type:", typeof auth); 

router.get("/send", auth, mailController.getSend);
router.get("/dashboard", auth, mailController.getDashboard);
router.post("/send-mail", auth, mailController.sendMail);

module.exports = router;
