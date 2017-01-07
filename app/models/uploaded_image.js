const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadedImageSchema = new Schema({
  _id: Number,
  name: String,
});

module.exports = mongoose.model('UploadedImage', UploadedImageSchema);