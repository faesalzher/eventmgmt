const mongo = require('mongoose');
const Schema = mongo.Schema;

const Event = new Schema({
  _id: String,
  event_name: String,
  event_description: String,
  event_location: String,
  cancel: Boolean,
  event_start_date: String,
  event_end_date: String,
  picture: String,
  project_id: String,
})

module.exports = mongo.model('Event', Event)