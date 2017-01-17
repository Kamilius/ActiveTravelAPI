const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
});

module.exports = mongoose.model('Slide', SlideSchema);