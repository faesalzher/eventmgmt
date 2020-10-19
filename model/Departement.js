const mongo = require('mongoose');
const Schema = mongo.Schema;

const Departement = new Schema({
  _id:String,
  departement_name:String,
  organization_id:String,
})

module.exports = mongo.model('Departement',Departement)