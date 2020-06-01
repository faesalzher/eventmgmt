const mongo = require('mongoose');
const Schema = mongo.Schema;

const Staff = new Schema({
  _id: String,
  staff_name: String,
  position_name: String,
  email: String,
  phone_number: String,
  password: String,
  picture: String,
  departement_id: String,
})

module.exports = mongo.model('Staff', Staff)