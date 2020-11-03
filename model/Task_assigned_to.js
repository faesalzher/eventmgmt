const mongo = require("mongoose");
const Schema = mongo.Schema;

const Task_assigned_to = new Schema({
  _id: String,
  task_id: String,
  comitee_id: String,
});

module.exports = mongo.model("Task_assigned_to", Task_assigned_to);
