const express = require('express');
const { signInUser, logIn, reset } = require("../handlers/userHandler");
const router = express();

router.post('/signIn',signInUser)
router.post('/logIn', logIn)
router.post("/edit", reset);


module.exports = router;