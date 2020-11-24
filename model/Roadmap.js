const mongo = require("mongoose");
const Schema = mongo.Schema;

const Roadmap = new Schema({
  _id: String,
  roadmap_name: String,
  start_date: String,
  end_date: String,
  color: String,
  committee_id: String,
  event_id: String,
  project_id:String,
});

module.exports = mongo.model("Roadmap", Roadmap);
