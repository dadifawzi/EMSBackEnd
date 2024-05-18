// models/Service.js

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  start: { type: String, required: true }, 
  end: { type: String, required: true },    
  details: { type: String },
  invoice: { type: String },
  amount: { type: Number },
  allDay:{type:Boolean}
});

module.exports = mongoose.model('Service', serviceSchema);
