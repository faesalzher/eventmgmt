const mongo = require("mongoose");
const Schema = mongo.Schema;

const Person_in_charge = new Schema({
  _id: String,
  order: String,
  staff_id: String,
  position_id: String,
  committee_id: String,
  project_id: String,
});

module.exports = mongo.model("Person_in_charge", Person_in_charge);
