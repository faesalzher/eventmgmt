const mongo = require('mongoose');
const Schema = mongo.Schema;

const Event = new Schema({
  _id:String,
  event_name:String,
  event_start_date:String,
  event_end_date:String,
  organization:String,
})

module.exports = mongo.model('Event',Event)