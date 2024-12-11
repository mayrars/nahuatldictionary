const mongoose = require("mongoose")
const entrySchema = mongoose.Schema({
    word: {
        type: String,
        required: [true, 'Word is required'],
        trim: true,
    },
    pronunciation:[{
      audio: {
        type:String,
        trim: true,
      },
      sourceUrl:{
        type:String,
        trim: true,
      }  
    }], 
    meanings: [{
        definitions:{
            type: String,
            required: [true, 'Meaning is required'],
            trim: true,
        },
        example:{
            type: String,
            trim: true,
        }
    }]
})