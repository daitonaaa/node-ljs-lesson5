const config = require('config');
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('debug', true);
mongoose.plugin(beautifyUnique);

mongoose.connect(config.get('mongodb.uri'));

module.exports = mongoose;
