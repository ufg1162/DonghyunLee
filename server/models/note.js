var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        id: {type: Number},
        text: {type: String},
        lastUpdatedDate: {type: Date},
        tags: [],
    }
);

NoteSchema
    .virtual('date')
    .get(function() {
        return this.lastUpdatedDate;
    });

module.exports = mongoose.model('Note', NoteSchema);