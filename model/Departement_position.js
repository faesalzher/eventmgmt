const mongo = require('mongoose');
const Schema = mongo.Schema;

const Departement_position = new Schema({
  _id: String,
  departement_position_name: String,
  organization_id: String,
})

module.exports = mongo.model('Departement_position', Departement_position)