const mongo = require("mongoose");
const Schema = mongo.Schema;

const Task = new Schema({
  _id: String,
  task_name: String,
  priority: String,
  completed: Boolean,
  task_description: String,
  due_date: String,
  completed_date: String,
  created_at: String,
  created_by: String,
  roadmap_id: String
});

module.exports = mongo.model("Task", Task);