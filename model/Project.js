const mongo = require('mongoose');
const Schema = mongo.Schema;

const Project = new Schema({
  _id:String,
  project_name:String,
  status:String,
  project_start_date:String,
  project_end_date:String,
  head_of_project_id:String,
})

module.exports = mongo.model('Project',Project)