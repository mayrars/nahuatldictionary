const mongoose = require("mongoose");

// Pronunciation schema
const pronunciationSchema = new mongoose.Schema({
    audio: {
        type: String,
        trim: true,
    },
    sourceUrl: {
        type: String,
        trim: true,
    },
});
//Meanings schema
const meaningSchema = new mongoose.Schema({
    definitions: {
        type: [String], 
        required: [true, 'At least one definition is required'],
        trim: true,
    },
    examples: {
        type: String,
        trim: true,
    },
});

// principal schema
const entrySchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, 'Word is required'],
        trim: true,
    },
    pronunciation: [pronunciationSchema], 
    meanings: [meaningSchema], 
});

module.exports = mongoose.model("Entry", entrySchema);
