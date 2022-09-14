const express = require("express");
const { allMessage, sendMessage } = require("../controllers/message.controller");
const { protect } = require("../middlewares/middleware_auth/authJwt")

const router =express.Router()