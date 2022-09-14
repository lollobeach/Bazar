const express = require("express");
const { accessChat, fetchChats } = require();
const { verifyToken } = require("../middlewares/middleware_auth/authJwt");

const router = express.Router();

router.route("/newchat").post(verifyToken, accessChat);
router.route("/getchats").get(verifyToken, fetchChats);