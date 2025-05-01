const mongoose = require('mangoose');
const { Schema } = require('mongoose');

const NotesSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true,
        unique: true
    },
    tag : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.module('notes', NotesSchema);