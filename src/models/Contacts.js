const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  tel: {
    type: Number,
  },
  email: {
    type: String,
  },
});


module.exports = mongoose.model('Contacts', contactsSchema);
