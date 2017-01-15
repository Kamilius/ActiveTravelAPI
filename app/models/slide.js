const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Slide', SlideSchema);