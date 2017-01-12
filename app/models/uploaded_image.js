const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadedImageSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('UploadedImage', UploadedImageSchema);