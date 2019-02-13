const express = require("express");
const userControls = require("../controls/user");
const router = express.Router();


router.post("/user", userControls.postUser);

router.post("/login", userControls.postLogin);
module.exports = router;

