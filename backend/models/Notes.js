const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true,
    },
    tag : {
        type: String,
        required: "General"
    },
    date : {
        type: Date,
        default: Date.now
    },
});
// const Notes = mongoose.model('notes', NotesSchema);
// Notes.createIndexes();
module.exports = mongoose.model('notes', NotesSchema);