const mongo = require('mongoose');
const Schema = mongo.Schema;

const Staff = new Schema({
  _id:String,
  staff_name:String,
  email:String,
  phone_number:String,
  address:String,
  departement_id:String,
})

module.exports = mongo.model('Staff',Staff)