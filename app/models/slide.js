const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  fileName: String,
});

module.exports = mongoose.model('Slide', SlideSchema);