const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadedImageSchema = new Schema({
  base64: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('UploadedImage', UploadedImageSchema);