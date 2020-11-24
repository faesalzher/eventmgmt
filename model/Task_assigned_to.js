const mongo = require("mongoose");
const Schema = mongo.Schema;

const Task_assigned_to = new Schema({
  _id: String,
  person_in_charge_id: String,
  task_id: String,
  roadmap_id: String,
  project_id: String,
  event_id: String,
  created_at: String,
  staff_id: String,
});

module.exports = mongo.model("Task_assigned_to", Task_assigned_to);
