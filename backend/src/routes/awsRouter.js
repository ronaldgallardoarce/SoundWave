const {Router}=require('express');
const {awsHandler}=require('../handlers')
const router=Router();
const multer = require("multer");
const fs = require("fs");
const { emitter } = require('../services/aws_s3');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/upload", upload.single("file"),awsHandler);

router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  emitter.on("progress", (percentage) => {
    console.log('handler ',percentage);
    res.write(`data: ${percentage}\n\n`);
  });

  req.on("close", () => {
    emitter.removeAllListeners("progress");
  });
});

module.exports=router;