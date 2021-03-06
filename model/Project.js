const mongo = require("mongoose");
const Schema = mongo.Schema;

const Project = new Schema({
  _id: String,
  project_name: String,
  project_description: String,
  project_start_date: String,
  project_end_date: String,
  picture: String,
  created_at: String,
  organization_id: String,
});

module.exports = mongo.model("Project", Project);
