const mongo = require('mongoose');
const Schema = mongo.Schema;

const Organization = new Schema({
  _id: String,
  organization_name: String,
  description: String,
  email: String,
  phone_number: String,
  address: String,
  picture: String,
})

module.exports = mongo.model('Organization', Organization)