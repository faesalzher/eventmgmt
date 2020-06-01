const mongo = require('mongoose');
const Schema = mongo.Schema;

const Division = new Schema({
  _id:String,
  division_name:String,
  project_id:String,
})

module.exports = mongo.model('Division',Division)