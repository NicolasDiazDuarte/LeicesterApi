const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
 
    homeTeam : {
        type: String,
        trim: true
    },
    awayTeam : {
        type: String,
        trim: true
    },
    homeScore: Number,

    awayScore: Number,

    date: Date,

    points : Number,

    
});
module.exports = mongoose.model('Matches', matchesSchema) ;