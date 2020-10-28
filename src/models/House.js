const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  layout: {
    type: String,
  },
  benefits: {
    type: String,
  },
  images: [{
    type: String,
  }],
});


module.exports = mongoose.model('House', houseSchema);
