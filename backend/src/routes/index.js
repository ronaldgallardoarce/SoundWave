const {Router}= require('express');
const AwsRouter=require('./awsRouter');
const router = Router();

router.use("/aws", AwsRouter);

module.exports = router;


//http://localhost:3001/api/aws/upload