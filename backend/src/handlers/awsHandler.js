const { awsController } = require("../controllers");
const { uploadFile } = require("../services/aws_s3");
const { AWS_CLOUDFRONT }=require('../services/s3');
const fs = require('fs')
const awsHandler = async (req, res) => {
  try {
    const file=req.file;
    const result = await uploadFile(file);
    fs.unlink(file.path, (err) => {
      if (err)
        console.error(
          `Error deleting temp file ${file.path}:`,
          err
        );
    });
    res.status(200).json({ result: result, key: AWS_CLOUDFRONT +result.Key});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al subir el archivo a AWS S3" });
  }
};




module.exports = {
  awsHandler,
};
