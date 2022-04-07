var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        id: {type: String},
        text: {type: String},
        lastUpdatedDate: {type: String},
        tags: [],
    }
);

NoteSchema
    .virtual('date')
    .get(function() {
        return this.lastUpdatedDate;
    });

module.exports = mongoose.model('Note', NoteSchema);