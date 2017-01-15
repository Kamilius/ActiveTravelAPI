const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  serviceCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);