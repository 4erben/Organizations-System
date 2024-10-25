const express = require("express");
const refreshToken = require("../controllers/refreshToken.Controller");
const router = express.Router();

router.post("/",refreshToken);

module.exports = router;