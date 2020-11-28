const mongo = require("mongoose");
const Schema = mongo.Schema;

const Staff = new Schema({
  _id: String,
  staff_name: String,
  email: String,
  phone_number: String,
  password: String,
  picture: String,
  is_admin: Boolean,
  departement_position_id: String,
  departement_id: String,
  organization_id: String,
});

module.exports = mongo.model("Staff", Staff);
