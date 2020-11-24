const mongo = require('mongoose');
const Schema = mongo.Schema;

const External = new Schema({
  _id: String,
  external_name: String,
  external_type: String,
  email: String,
  event_id: String,
  phone_number: String,
  details: String,
  picture:String,
  project_id:String,
})
module.exports = mongo.model('External', External)