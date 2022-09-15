const express = require("express");
const { accessChat, fetchChats } = require("../controllers/chat.controller");
const { verifyToken } = require("../middlewares/middleware_auth/authJwt");

const router = express.Router();

router.route("/newchat").post(verifyToken, accessChat);
router.route("/getchats").get(verifyToken, fetchChats);

module.exports = router;