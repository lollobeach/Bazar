const express = require("express");
const { allMessage, sendMessage } = require("../controllers/message.controller");
const { verifyToken } = require("../middlewares/middleware_auth/authJwt");

const router = express.Router();

router.route('/message/:chatId').get(verifyToken, allMessage);
router.route('/message').post(verifyToken, sendMessage);

module.exports = router;