const express = require('express');
const { signInUser, logIn } = require('../handlers/userHandler');
const router = express();

router.post('/signIn',signInUser)
router.post('/logIn', logIn)

module.exports = router;