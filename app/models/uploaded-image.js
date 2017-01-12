const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadedImageSchema = new Schema({
  base64: String,
});

module.exports = mongoose.model('UploadedImage', UploadedImageSchema);