const mongo = require("mongoose");
const Schema = mongo.Schema;

const Agenda = new Schema({
  _id: String,
  agenda_name: String,
  date: String,
  start_time: String,
  end_time: String,
  details: String,
  event_id: String,
});
module.exports = mongo.model("Agenda", Agenda);
