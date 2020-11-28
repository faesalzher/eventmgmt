const mongo = require("mongoose");
const Schema = mongo.Schema;

const Committee = new Schema({
  _id: String,
  committee_name: String,
  core: Boolean,
  organization_id: String,
});

module.exports = mongo.model("Committee", Committee);
