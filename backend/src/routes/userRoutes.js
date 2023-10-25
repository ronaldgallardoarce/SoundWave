const express = require('express');
const { signInUser } = require('../handlers/userHandler');
const router = express();

router.post('/signIn',signInUser)

module.exports = router;