const { Router } = require('express');
const spotifyRoutes = require('./spotifyRoutes');
const userRoutes= require('./userRoutes');

const router = Router();

router.use('/spotify',spotifyRoutes)
router.use('/user', userRoutes);

module.exports = router;