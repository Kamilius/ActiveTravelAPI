const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  _id: Number,
  capacity: Number,
  serviceCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceCategory',
  },
  description: String,
  image: String,
  location: String,
  price: String,
  title: String,
});

module.exports = mongoose.model('Service', ServiceSchema);