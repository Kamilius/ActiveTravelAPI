const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  _id: Number,
  size: Number,
  title: String,
  url: String,
});

module.exports = mongoose.model('Document', DocumentSchema);