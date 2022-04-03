var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String},
        email: {type: String},
        colorScheme: {type: String},
    }
);

UserSchema
    .virtual('color')
    .get(function() {
        return this.colorScheme;
    });

module.exports = mongoose.model('User', UserSchema);