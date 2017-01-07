const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceCategorySchema = new Schema({
  _id: Number,
  name: String,
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);