const {Router}= require('express');
const AwsRouter=require('./awsRouter');
const trackRouter=require('./trackRouter');
const router = Router();


//http://localhost:3001/api/aws/upload 
const spotifyRoutes = require('./spotifyRoutes');
const userRoutes= require('./userRoutes');
const artistRouter=require('./artistRoutes');
router.use("/aws", AwsRouter);
router.use('/spotify',spotifyRoutes)
router.use('/user', userRoutes);
router.use("/artist", artistRouter);
router.use("/track", trackRouter);


module.exports = router;
