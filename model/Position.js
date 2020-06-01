const mongo = require('mongoose');
const Schema = mongo.Schema;

const Position = new Schema({
  _id: String,
  position_name: String,
  core: String,
})

module.exports = mongo.model('Position', Position)