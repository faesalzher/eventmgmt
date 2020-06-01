const mongo = require('mongoose');
const Schema = mongo.Schema;

const Comitee = new Schema({
  _id:String,
  staff_id:String,
  position_id:String,
  division_id:String,
  project_id:String,
})

module.exports = mongo.model('Comitee',Comitee)