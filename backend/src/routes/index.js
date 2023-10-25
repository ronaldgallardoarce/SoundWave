const { Router } = require('express');
const spotifyRoutes = require('./spotifyRoutes');

const router = Router();

router.use('/spotify',spotifyRoutes)

module.exports = router;