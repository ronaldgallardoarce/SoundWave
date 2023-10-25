const express = require('express');
const { searchDataByType } = require('../handlers/spotifyHandler');
const router = express();

router.post('/searchData',searchDataByType)

module.exports = router;