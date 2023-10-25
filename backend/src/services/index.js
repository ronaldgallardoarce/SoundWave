const { uploadFile, emitter } = require("./aws_s3");

module.exports = {
  asw_upload: uploadFile,
  emitter: emitter,
};