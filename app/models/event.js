const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  _id: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  dayAmount: Number,
  description: String,
  image: String,
  isHot: Boolean,
  location: String,
  price: String,
  startDate: Date,
  title: String,
});

module.exports = mongoose.model('Event', EventSchema);