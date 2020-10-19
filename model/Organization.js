const mongo = require('mongoose');
const Schema = mongo.Schema;

const Organization = new Schema({
  _id: String,
  organization_name: String,
  email: String,
  password: String,
})

module.exports = mongo.model('Organization', Organization)